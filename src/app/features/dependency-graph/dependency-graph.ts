import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {DependencyGraphService} from './service/dependency-graph';
import {Node, Edge, NgxGraphModule} from '@swimlane/ngx-graph';
import {curveLinear} from 'd3-shape';
import {ActivatedRoute} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Loader} from '../../shared/components/loader/loader';
import {firstValueFrom} from 'rxjs';

function safeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_');
}

@Component({
  selector: 'features-dependency-graph',
  standalone: true,
  imports: [NgxGraphModule, ProgressSpinnerModule, Loader],
  templateUrl: './dependency-graph.html',
  styleUrls: ['./dependency-graph.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependencyGraph implements OnInit {
  private readonly graphService = inject(DependencyGraphService);
  private readonly route = inject(ActivatedRoute);

  nodes = signal<Node[]>([]);
  links = signal<Edge[]>([]);
  isLoading = signal<boolean>(false);

  readonly curve = curveLinear;

  async ngOnInit(): Promise<void> {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (!owner || !repo) {
      console.error('Missing route parameters: owner/repo');
      return;
    }

    this.isLoading.set(true);

    try {
      const graph = await firstValueFrom(this.graphService.getDependencyGraph(owner, repo));
      if (graph) {
        this.transformGraph(graph);
      }
    } catch (error) {
      console.error(`Failed to load dependency graph for ${owner}/${repo}:`, error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private transformGraph(graph: Record<string, string[]>): void {
    const nodeSet = new Set<string>();
    const edgeList: Edge[] = [];

    for (const [source, targets] of Object.entries(graph)) {
      const sourceId = safeId(source);
      nodeSet.add(source);

      for (const target of targets) {
        const targetId = safeId(target);
        nodeSet.add(target);

        edgeList.push({
          id: `${sourceId}->${targetId}`,
          source: sourceId,
          target: targetId,
        });
      }
    }

    this.nodes.set(
      Array.from(nodeSet).map((id) => ({
        id: safeId(id),
        label: id.split('/').pop() ?? id,
      }))
    );

    this.links.set(edgeList);
  }
}
