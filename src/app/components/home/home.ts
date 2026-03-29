import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameCard } from '../../game-card/game-card';
import { RecommendationModel } from '../../../models/recommendation.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private gameService = inject(GameService);

  // Requirement: Signal
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
      // Atualiza o Signal com a nova recomendação vinda do Back-end
      this.recommendations.update((old) => ({
        ...old,
        [slug]: res,
      }));
    });
  }


  fecharCard(slug: string) {
  this.recommendations.update(old => {
    const novoEstado = { ...old };
    delete novoEstado[slug];
    return novoEstado;
  });
}
}
