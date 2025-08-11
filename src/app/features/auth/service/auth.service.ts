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
  private readonly baseAPI = environment.baseAPI;
  private tokenKey = 'access_token';

  loginWithGithub() {
    window.location.href = `${this.baseAPI}/auth/github`;
  }

  handleAuthCallback() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this.userProfileService.getUserProfile();

      this.router.navigate(['/'], {replaceUrl: true});
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth'], {replaceUrl: true}).then(() => {
      window.location.reload();
    });
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken() ?? undefined;
    if (!token) return true;

    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return true;

      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);
      const exp = payload.exp;
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch {
      return true;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
}
