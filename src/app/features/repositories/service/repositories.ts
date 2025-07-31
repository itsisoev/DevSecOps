import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface GithubRepo {
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  private readonly baseAPI = environment.baseAPI;
  private readonly http = inject(HttpClient);

  getUserRepos(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.baseAPI}/github/repos`);
  }

  analyzeRepoPackage(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.baseAPI}/audit/github/${owner}/${repo}`);
  }

  downloadPackagePdf(owner: string, repo: string): Observable<Blob> {
    return this.http.get(`${this.baseAPI}/audit/github/${owner}/${repo}/pdf`, {
      responseType: 'blob',
    });
  }
}
