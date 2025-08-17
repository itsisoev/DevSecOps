import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {trigger, transition, style, animate} from '@angular/animations';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Message} from 'primeng/message';
import {Listbox} from 'primeng/listbox';
import {Toast} from 'primeng/toast';
import {Card} from 'primeng/card';

interface IText {
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-landing',
  imports: [
    Button,
    RouterLink,
    Message,
    Listbox,
    Toast,
    Card,
    PrimeTemplate
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('0.8s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ],
  providers: [MessageService]
})
export class Landing {
  private readonly toastService = inject(MessageService);
  features = signal<IText[]>([
    {label: 'Какие зависимости требуют обновления', icon: 'pi pi-check-circle', color: '#4CAF50'},
    {label: 'Какие версии устарели или несовместимы', icon: 'pi pi-exclamation-triangle', color: '#FFC107'},
    {label: 'Есть ли известные уязвимости в зависимостях', icon: 'pi pi-shield', color: '#F44336'}
  ]);

  constructor() {
  }

  showInfo() {
    this.toastService.add({
      severity: 'info',
      summary: 'Информация',
      detail: 'Больше информации о нашем сервисе вы можете найти в документации',
      life: 5000
    });
  }
}
