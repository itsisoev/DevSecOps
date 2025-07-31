import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment.development";
import {UserProfileData} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly baseAPI = environment.baseAPI;
  private readonly http = inject(HttpClient);

  private readonly _userProfile = signal<UserProfileData | null>(null);
  readonly userProfile = computed(() => this._userProfile());
  private isLoaded = false;

  getUserProfile() {
    if (!this.isLoaded) {
      this.http.get<UserProfileData>(`${this.baseAPI}/users/profile`).subscribe({
        next: (data) => {
          this._userProfile.set(data);
          this.isLoaded = true;
        },
        error: (err) => {
          console.error('Ошибка при получении профиля:', err);
        }
      });
    }
  }
}
