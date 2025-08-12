import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmptyState} from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'features-notification',
  imports: [
    EmptyState
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Notification {

}
