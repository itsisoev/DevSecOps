import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'features-login-success',
  imports: [],
  templateUrl: './login-success.html',
  styleUrl: './login-success.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginSuccess implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.handleAuthCallback();
  }
}
