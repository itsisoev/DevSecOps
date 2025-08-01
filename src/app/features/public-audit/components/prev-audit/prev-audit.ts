import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicAuditService} from '../../service/public-audit';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AuditResponse} from '../../../../shared/models/audit.model';
import {MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-prev-audit',
  standalone: true,
  imports: [
    TableModule,
    Tag,
    Toast,
    Button,
  ],
  templateUrl: './prev-audit.html',
  styleUrl: './prev-audit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class PrevAudit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly auditService = inject(PublicAuditService);
  private readonly toast = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  auditResponse = signal<AuditResponse>({
    hash: '',
    message: '',
    results: [],
    projectName: '',
  });

  isLoading = signal(false);

  ngOnInit(): void {
    this.loadAudit();
  }

  private loadAudit(): void {
    const hash = this.route.snapshot.paramMap.get('hash');

    if (!hash) {
      this.toast.add({severity: 'error', summary: 'Ошибка', detail: 'Хэш не найден в URL'});
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);

    this.auditService.getResult(hash)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.auditResponse.set(res);
          this.isLoading.set(false);
          this.toast.add({severity: 'success', summary: 'Успех', detail: 'Данные успешно получены'});
        },
        error: () => {
          this.toast.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка получения данных'});
          this.isLoading.set(false);
        },
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

  formatSize(size?: number): string {
    if (!size) return '—';
    const kb = size / 1024;
    return kb > 1024
      ? `${(kb / 1024).toFixed(2)} MB`
      : `${kb.toFixed(1)} KB`;
  }

  getSizeSeverity(label?: string): 'success' | 'warning' | 'danger' {
    switch (label) {
      case 'small':
        return 'success';
      case 'medium':
        return 'warning';
      case 'large':
        return 'danger';
      default:
        return 'warning';
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
