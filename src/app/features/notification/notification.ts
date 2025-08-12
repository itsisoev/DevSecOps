import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {EmptyState} from '../../shared/components/empty-state/empty-state';
import {NotificationService} from './service/notification';


import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Loader} from '../../shared/components/loader/loader';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'features-notification',
  imports: [
    EmptyState,
    Loader,
    DatePipe
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Notification implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  notifications = signal<SimplifiedNotification[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.isLoading.set(true);

    this.notificationService.getNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (notifications) => {
          const mapped = notifications.map((n: any) => this.mapNotification(n));
          this.notifications.set(mapped);
          this.isLoading.set(false);
        },
        error: () => {
          this.notifications.set([]);
          this.isLoading.set(false);
        }
      });
  }

  private mapNotification(n: any): SimplifiedNotification {
    return {
      id: n.id,
      unread: n.unread,
      reason: n.reason,
      updatedAt: n.updated_at,
      title: n.subject?.title ?? '',
      type: n.subject?.type ?? '',
      url: n.subject?.url ?? '',
      repoName: n.repository?.full_name ?? '',
      repoUrl: n.repository?.html_url ?? '',
      ownerLogin: n.repository?.owner?.login ?? '',
      ownerAvatarUrl: n.repository?.owner?.avatar_url ?? '',
      ownerUrl: n.repository?.owner?.html_url ?? '',
    };
  }
}
