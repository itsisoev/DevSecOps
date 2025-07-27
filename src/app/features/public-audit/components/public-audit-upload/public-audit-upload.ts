import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {PublicAuditService} from '../../service/public-audit';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {AuditResult} from '../../../../shared/models/audit.model';

@Component({
  selector: 'features-public-audit-upload',
  imports: [
    Button
  ],
  templateUrl: './public-audit-upload.html',
  styleUrl: './public-audit-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicAuditUpload {
  private readonly auditService = inject(PublicAuditService)
  private readonly router = inject(Router);

  auditResponse = signal<{ hash: string; message: string; results: AuditResult[] }>({
    hash: '',
    message: '',
    results: []
  });
  isLoading = signal<boolean>(false);
  file = signal<File | null>(null);


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.file.set(null);
      return;
    }
    this.file.set(input.files[0]);
  }

  submit() {
    const selectedFile = this.file();
    if (!selectedFile) {
      return;
    }
    this.isLoading.set(true);
    this.auditResponse.set({
      hash: '',
      message: '',
      results: []
    });

    this.auditService.checkPackage(selectedFile).subscribe({
      next: (res) => {
        this.auditResponse.set(res);
        this.isLoading.set(false);
        this.router.navigate(['/public-audit', res.hash]);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
