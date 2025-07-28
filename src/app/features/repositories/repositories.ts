import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GithubRepo, RepositoriesService} from './service/repositories';

@Component({
  selector: 'app-repositories',
  imports: [],
  templateUrl: './repositories.html',
  styleUrl: './repositories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Repositories implements OnInit {
  repos: GithubRepo[] = [];

  constructor(private reposService: RepositoriesService) {}

  ngOnInit() {
    this.reposService.getUserRepos().subscribe({
      next: data => this.repos = data,
      error: err => {
        console.error('Ошибка при загрузке репозиториев', err);
        this.repos = [];
      }
    });
  }
}
