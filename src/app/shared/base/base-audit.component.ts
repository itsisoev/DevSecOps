import {DestroyRef, inject, signal} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuditResponse} from '../models/audit.model';

export abstract class BaseAuditComponent {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly toast = inject(MessageService);

  isLoading = signal(false);
  auditResponse = signal<AuditResponse>({
    hash: '',
    message: '',
    results: [],
    projectName: '',
  });

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
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
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

  protected handleError(detail: string) {
    this.toast.add({severity: 'error', summary: 'Ошибка', detail});
    this.isLoading.set(false);
  }

  protected handleSuccess(detail: string) {
    this.toast.add({severity: 'success', summary: 'Готово', detail});
  }
}
