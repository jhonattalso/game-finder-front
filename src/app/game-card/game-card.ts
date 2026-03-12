import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'game-card',
  imports: [],
  templateUrl: './game-card.html',
})
export class GameCard {
  gameName = input.required<string>();
  recommendation = input.required<string>();
  stars = input.required<string>();
  explanation = input.required<string>();

  tituloFormatado = computed(() => {
    return `Análise de: ${this.gameName().toUpperCase()}`;
  });
}
