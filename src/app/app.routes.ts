import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'public-audit',
    loadChildren: () => import('./features/public-audit/public-audit.routes').then(m => m.publicAuditRoutes)
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing').then(m => m.Landing)
      }
    ]
  }
];
