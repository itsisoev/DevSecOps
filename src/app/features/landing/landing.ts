import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {

}
