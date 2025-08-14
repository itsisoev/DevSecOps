import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {RepositoriesService} from '../../service/repositories';
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import {finalize} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Skeleton} from 'primeng/skeleton';
import {AuditResponse, AuditResult} from '../../../../shared/models/audit.model';
import {Button} from 'primeng/button';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseAuditComponent} from '../../../../shared/base/base-audit.component';

const SKELETON_ITEMS_COUNT = 10;

@Component({
  selector: 'features-repo-analysis',
  imports: [
    TableModule,
    Tag,
    Skeleton,
    Button
  ],
  templateUrl: './repo-analysis.html',
  styleUrl: './repo-analysis.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class RepoAnalysis extends BaseAuditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly repoService = inject(RepositoriesService);
  private readonly messageService = inject(MessageService);

  auditResult = signal<AuditResponse>({projectName: '', results: [], message: '', hash: ''});
  downloadInProgress = signal(false);
  skeletonItems = this.generateSkeletonItems();

  ngOnInit() {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (!owner || !repo) {
      this.handleError('Некорректный путь');
      return;
    }

    this.loadRepoAudit(owner, repo);
  }

  downloadPdf() {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (!owner || !repo) {
      this.handleError('Некорректный путь');
      return;
    }

    this.downloadInProgress.set(true);

    this.repoService.downloadPackagePdf(owner, repo)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.downloadInProgress.set(false)))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${repo}_audit_report.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.handleSuccess('PDF скачан');
        },
        error: () => this.handleError('Не удалось скачать PDF')
      });
  }

  private loadRepoAudit(owner: string, repo: string) {
    this.isLoading.set(true);

    this.repoService.analyzeRepoPackage(owner, repo)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.auditResult.set(res);
          this.handleSuccess('Зависимости проанализированы');
        },
        error: () => this.handleError('Не удалось получить данные')
      });
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
