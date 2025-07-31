import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserProfileService} from './service/user-profile';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'features-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile {
  private readonly userProfileService = inject(UserProfileService);



}
