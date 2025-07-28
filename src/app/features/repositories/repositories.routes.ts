import {Routes} from "@angular/router";
import {Repositories} from './repositories';


export const repositoriesRoutes: Routes = [
  {
    path: '',
    component: Repositories,
    children: []
  }
]
