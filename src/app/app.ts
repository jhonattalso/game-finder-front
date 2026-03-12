import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameCard } from './game-card/game-card';
import { RecommendationModel } from '../models/recommendation.model';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, GameCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  gameService = inject(GameService);

  recommendations = signal<Record<string, RecommendationModel>>({});

  jogos = [
    { nome: 'Elden Ring', slug: 'elden-ring' },
    { nome: 'Baldur’s Gate 3', slug: 'baldurs-gate-3' },
    { nome: 'God of War Ragnarok', slug: 'god-of-war-ragnarok' },
    { nome: 'Cyberpunk 2077', slug: 'cyberpunk-2077' },
    { nome: 'Need for Speed Heat', slug: 'need-for-speed-heat' },
    { nome: 'The Lord of the Rings: Gollum', slug: 'the-lord-of-the-rings-gollum' },
  ];

  buscar(slug: string) {
    this.gameService.getRecommendation(slug).subscribe((res) => {
      this.recommendations.update((old) => ({
        ...old,
        [slug]: res,
      }));
    });
  }
}
