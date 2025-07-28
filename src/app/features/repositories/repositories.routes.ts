import {Routes} from "@angular/router";
import {Repositories} from './repositories';


export const repositoriesRoutes: Routes = [
  {
    path: '',
    component: Repositories,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/all-repositories/all-repositories').then(m => m.AllRepositories)
      }
    ]
  }
]
