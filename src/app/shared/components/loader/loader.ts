import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'uc-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loader {

}
