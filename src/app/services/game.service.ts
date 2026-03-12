import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendationModel } from '../../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  http = inject(HttpClient);

  readonly apiUrl = 'http://localhost:8080/api/recommendations';

  getRecommendation(slug: string): Observable<RecommendationModel> {
    return this.http.get<RecommendationModel>(`${this.apiUrl}/${slug}`);
  }
}
