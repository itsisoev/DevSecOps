import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {AuditResponse} from '../../../shared/models/audit.model';

@Injectable({
  providedIn: 'root'
})
export class PublicAuditService {
  private readonly baseAPI = environment.baseAPI;

  private readonly http = inject(HttpClient);

  checkPackage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<AuditResponse>(`${this.baseAPI}/public-audit/check-package`, formData);
  }

  getResult(hash: string) {
    return this.http.get<AuditResponse>(`${this.baseAPI}/public-audit/result/${hash}`);
  }
}
