import {Routes} from '@angular/router';
import {LoginSuccess} from './features/auth/components/login-success/login-success';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'public-audit',
    loadChildren: () => import('./features/public-audit/public-audit.routes').then(m => m.publicAuditRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    canActivate: [AuthGuard],
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing').then(m => m.Landing)
      }
    ]
  },
  {path: 'login/success', component: LoginSuccess},
];
