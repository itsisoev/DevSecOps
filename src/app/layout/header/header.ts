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
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Features',
      icon: 'pi pi-star'
    },
    {
      label: 'Repositories',
      icon: 'pi pi-search',
      items: [
        {
          label: 'All Repositories',
          icon: 'pi pi-server',
          routerLink: '/repositories',
        },
        {
          label: 'Add project',
          icon: 'pi pi-plus'
        },
      ],
    }
  ]);
  protected readonly publicAuditRoutes = publicAuditRoutes;
}
