import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {Message} from 'primeng/message';

@Component({
  selector: 'features-auth',
  imports: [
    Card,
    Button,
    Divider,
    Message
  ],
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
