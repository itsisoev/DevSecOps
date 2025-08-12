import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly baseAPI = environment.baseAPI

  getNotifications(): Observable<SimplifiedNotification[]> {
    return this.http.get<SimplifiedNotification[]>(`${this.baseAPI}/github/notifications`);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseAPI}/notifications/${id}/read`, {});
  }
}
