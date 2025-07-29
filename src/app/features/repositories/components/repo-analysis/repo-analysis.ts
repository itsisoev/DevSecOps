import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {GithubRepo, RepositoriesService} from '../../service/repositories';
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import {finalize} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Skeleton} from 'primeng/skeleton';
import {AuditResponse, AuditResult} from '../../../../shared/models/audit.model';

const SKELETON_ITEMS_COUNT = 10;

@Component({
  selector: 'features-repo-analysis',
  imports: [
    TableModule,
    Tag,
    Skeleton
  ],
  templateUrl: './repo-analysis.html',
  styleUrl: './repo-analysis.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class RepoAnalysis implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly repoService = inject(RepositoriesService);
  private readonly messageService = inject(MessageService);

  isLoading = signal<boolean>(false);
  auditResult = signal<AuditResponse>({results: [], message: '', hash: ''});
  skeletonItems = this.generateSkeletonItems();

  ngOnInit() {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (!owner || !repo) {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Некорректный путь'});
      return;
    }

    this.isLoading.set(true);

    this.repoService.analyzeRepoPackage(owner, repo)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.auditResult.set(res);
          this.messageService.add({severity: 'success', summary: 'Готово', detail: 'Зависимости проанализированы'});
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Не удалось получить данные'});
        }
      });
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'safe':
        return 'success';
      case 'updateRecommended':
        return 'warning';
      case 'vulnerable':
        return 'danger';
      default:
        return 'warning';
    }
  }

  private generateSkeletonItems(): AuditResult[] {
    return Array.from({length: SKELETON_ITEMS_COUNT}, () => ({
      name: '',
      version: '',
      needsUpdate: false,
      latestVersion: '',
      status: 'safe'
    }));
  }

}
