import {inject, Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment.development';
import {UserProfileService} from '../../user-profile/service/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userProfileService = inject(UserProfileService);
  private readonly baseAPI = environment.baseAPI
  private tokenKey = 'access_token';

  loginWithGithub() {
    window.location.href = `${this.baseAPI}/auth/github`;
  }

  handleAuthCallback() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this.userProfileService.getUserProfile();
      this.router.navigate(['/']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
