import {Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'public-audit',
    loadChildren: () =>
      import('./features/public-audit/public-audit.routes').then(m => m.publicAuditRoutes)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'login/success',
    loadComponent: () =>
      import('./features/auth/components/login-success/login-success').then(m => m.LoginSuccess)
  },
  {
    canActivate: [AuthGuard],
    path: 'notification',
    loadComponent: () =>
      import('./features/notification/notification').then(m => m.Notification)
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing').then(m => m.Landing)
      },
      {
        canActivate: [AuthGuard],
        path: 'repositories',
        loadChildren: () =>
          import('./features/repositories/repositories.routes').then(m => m.repositoriesRoutes)
      },
      {
        canActivate: [AuthGuard],
        path: 'profile',
        loadChildren: () =>
          import('./features/user-profile/user-profile.routes').then(m => m.userProfileRoutes),
      },
      {
        canActivate: [AuthGuard],
        path: 'dependency-graph',
        loadChildren: () =>
          import('./features/dependency-graph/dependency-graph.routes').then(m => m.dependencyGraphRoutes)
      }
    ]
  },
];
