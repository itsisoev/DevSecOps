import {Routes} from '@angular/router';
import {UserProfile} from './user-profile';

export const userProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfile,
    children: []
  }
]
