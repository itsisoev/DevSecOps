import {Routes} from "@angular/router";
import {PublicAudit} from './public-audit';


export const publicAuditRoutes: Routes = [
  {
    path: '',
    component: PublicAudit,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/public-audit-upload/public-audit-upload').then(m => m.PublicAuditUpload)
      },
      {
        path: ':hash',
        loadComponent: () => import('./components/prev-audit/prev-audit').then(m => m.PrevAudit)
      }
    ]
  }
]
