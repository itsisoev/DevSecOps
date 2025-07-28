import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-repositories',
  imports: [
    RouterOutlet
  ],
  templateUrl: './repositories.html',
  styleUrl: './repositories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Repositories {
}
