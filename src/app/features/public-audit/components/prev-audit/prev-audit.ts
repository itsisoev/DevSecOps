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
import {BaseAuditComponent} from '../../../../shared/base/base-audit.component';

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
export class PrevAudit extends BaseAuditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly auditService = inject(PublicAuditService);

  ngOnInit(): void {
    this.loadAudit();
  }

  private loadAudit(): void {
    const hash = this.route.snapshot.paramMap.get('hash');

    if (!hash) {
      this.handleError('Хэш не найден в URL');
      return;
    }

    this.isLoading.set(true);

    this.auditService.getResult(hash)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.auditResponse.set(res);
          this.isLoading.set(false);
          this.handleSuccess('Данные успешно получены');
        },
        error: () => this.handleError('Ошибка получения данных'),
      });
  }
}
