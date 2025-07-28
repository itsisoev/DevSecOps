import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {InputText} from 'primeng/inputtext';
import {publicAuditRoutes} from '../../features/public-audit/public-audit.routes';

@Component({
  selector: 'layout-header',
  imports: [
    Menubar,
    InputText,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
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
          icon: 'pi pi-star'
        },
      ],
    }
  ]);
  protected readonly publicAuditRoutes = publicAuditRoutes;
}
