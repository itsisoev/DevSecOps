import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
@Component({
  selector: 'features-public-audit',
  imports: [
    RouterOutlet
  ],
  templateUrl: './public-audit.html',
  styleUrl: './public-audit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicAudit {

}
