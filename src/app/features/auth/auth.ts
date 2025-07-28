import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'features-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Auth implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.handleAuthCallback();
  }

  login() {
    this.authService.loginWithGithub();
  }
}
