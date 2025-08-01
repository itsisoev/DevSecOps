import {Routes} from '@angular/router';
import {DependencyGraph} from './dependency-graph';

export const dependencyGraphRoutes: Routes = [
  {
    path: ':owner/:repo',
    component: DependencyGraph,
    children: []
  }
]
