import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Toast} from 'primeng/toast';
import {RepositoriesService} from '../../service/repositories';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Skeleton} from 'primeng/skeleton';
import {catchError, finalize, of} from 'rxjs';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {GithubRepo} from '../../../../shared/models/repository.model';

const SKELETON_ITEMS_COUNT = 10;

@Component({
  selector: 'features-all-repositories',
  imports: [PrimeTemplate, TableModule, Toast, Skeleton, Button],
  templateUrl: './all-repositories.html',
  styleUrl: './all-repositories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class AllRepositories implements OnInit {
  private readonly reposService = inject(RepositoriesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  repos = signal<GithubRepo[]>([]);
  isLoading = signal<boolean>(false);
  skeletonItems = this.generateSkeletonItems();

  ngOnInit() {
    this.getAllRepos();
  }

  getAllRepos() {
    this.isLoading.set(true);

    this.reposService.getUserRepos()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: err.message || 'Не удалось загрузить репозитории',
          });
          return of([]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((repos) => {
        this.repos.set(repos);
        if (repos.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Успех',
            detail: `Загружено ${repos.length} репозиториев`,
          });
        }
      });
  }

  onRepoClick(repo: GithubRepo) {
    const {owner, name} = repo;
    this.router.navigate(['repositories', 'analyze', owner.login, name]);
  }

  onDependencyGraph(repo: GithubRepo) {
    const {owner, name} = repo;
    this.router.navigate(['dependency-graph', owner.login, name]);
  }


  private generateSkeletonItems(): GithubRepo[] {
    return Array.from({length: SKELETON_ITEMS_COUNT}, () => ({
      name: '',
      full_name: '',
      private: false,
      language: '',
      owner: {login: ''},
    }));
  }
}
