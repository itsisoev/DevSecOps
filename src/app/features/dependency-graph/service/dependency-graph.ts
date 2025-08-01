import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyGraphService {
  private readonly baseAPI = environment.baseAPI;
  private readonly http = inject(HttpClient);

  getDependencyGraph(owner: string, repo: string): Observable<Record<string, string[]>> {
    return this.http.get<Record<string, string[]>>(`${this.baseAPI}/github/dependency-graph/${owner}/${repo}`);
  }
}
