import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {EmptyState} from '../../shared/components/empty-state/empty-state';
import {NotificationService} from './service/notification';
import {BehaviorSubject} from 'rxjs';
import {INotification} from '../../shared/models/notification.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'features-notification',
  imports: [
    EmptyState
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Notification implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  private notificationsSubject = new BehaviorSubject<INotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  ngOnInit() {
    this.notificationService
      .getNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (notifications) => this.notificationsSubject.next(notifications),
        error: () => this.notificationsSubject.next([]),
      });

    console.log(this.notificationsSubject);
  }
}
