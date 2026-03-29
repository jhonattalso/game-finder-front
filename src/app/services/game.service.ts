import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendationModel } from '../../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  http = inject(HttpClient);

  readonly apiUrl = 'http://localhost:8080/api/v1/games';
  getRecommendation(name: string): Observable<RecommendationModel> {
    return this.http.get<RecommendationModel>(this.apiUrl, { params: { name } });
  }
}
