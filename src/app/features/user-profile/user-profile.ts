import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {UserProfileService} from './service/user-profile';
import {toSignal} from '@angular/core/rxjs-interop';
import {UserProfileData} from '../../shared/models/user.model';

@Component({
  selector: 'features-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile implements OnInit {
  private readonly userProfileService = inject(UserProfileService);
  private readonly destroyRef = inject(DestroyRef);
  userProfile = signal<UserProfileData | null>(null);

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfile.set(this.userProfileService.userProfile())
  }
}
