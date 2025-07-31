import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {UserProfileService} from '../../features/user-profile/service/user-profile';

@Component({
  selector: 'layout-header',
  standalone: true,
  imports: [
    Menubar,
    Menu,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit {
  private readonly userProfileService = inject(UserProfileService);
  private readonly destroyRef = inject(DestroyRef);

  links = signal<MenuItem[]>([
    {
      label: 'Главная страница',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Репозитории',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Все репозитории',
          icon: 'pi pi-server',
          routerLink: '/repositories',
        },
        {
          label: 'Избранные репозитории',
          icon: 'pi pi-star',
          routerLink: '/repositories/favorites'
        },
      ],
    }
  ]);

  profileItem = signal<MenuItem[]>([
    {
      label: 'Профиль',
      icon: 'pi pi-user',
      routerLink: '/profile',
    },
    {
      label: 'Выйти',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ]);

  avatarUrl = computed(() => {
    const profile = this.userProfileService.userProfile();
    if (!profile) return '/assets/svg/default-avatar.svg';

    if (profile.photos) {
      if (typeof profile.photos === 'string') return profile.photos;
      if (Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0].value) {
        return profile.photos[0].value;
      }
    }

    return '/assets/svg/default-avatar.svg';
  });

  ngOnInit() {
    this.userProfileService.getUserProfile();
  }

  openProfile() {
  }

  logout() {
  }
}
