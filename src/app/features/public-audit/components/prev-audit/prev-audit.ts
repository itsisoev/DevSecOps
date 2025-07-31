import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {PublicAuditService} from '../../service/public-audit';
import {ActivatedRoute} from '@angular/router';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {AuditResponse} from '../../../../shared/models/audit.model';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-prev-audit',
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
  private readonly publicAuditService = inject(PublicAuditService);
  private readonly messageService = inject(MessageService);

  auditResponse = signal<AuditResponse>({
    hash: '',
    message: '',
    results: [],
    projectName: '',
  })
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.isLoading.set(true);

    const hash = this.route.snapshot.paramMap.get('hash');
    if (hash) {
      this.publicAuditService.getResult(hash).subscribe({
        next: (res) => {
          this.auditResponse.set(res);
          this.isLoading.set(false);
          this.messageService.add({severity: 'success', summary: 'Успех', detail: 'Данные успешно получены'});
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка получения данных'});
          this.isLoading.set(false);
        },
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Хэш не найден в URL'});
      this.isLoading.set(false);
    }
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
}

