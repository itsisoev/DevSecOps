import {Routes} from '@angular/router';
import {Repositories} from './repositories';

export const repositoriesRoutes: Routes = [
  {
    path: '',
    component: Repositories,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/all-repositories/all-repositories').then(m => m.AllRepositories)
      },
      {
        path: 'analyze/:owner/:repo',
        loadComponent: () =>
          import('./components/repo-analysis/repo-analysis').then(m => m.RepoAnalysis),
      }
    ]
  }
]
