import { Component, computed, input, output, model } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.html',
})
export class GameCard {
  // Requisito: Input
  name = input.required<string>();
  recommendation = input.required<string>();
  rating = input.required<number>();
  explanation = input.required<string>();

  // Requisito: Model
  favorito = model<boolean>(false);

  // Requisito: Output
  verDetalhes = output<string>();

  // Requisito: Signal
  tituloFormatado = computed(() => {
    return `Análise de: ${this.name().toUpperCase()}`;
  });

  toggleFavorito() {
    this.favorito.set(!this.favorito());
  }

  notificarClique() {
    this.verDetalhes.emit(this.name());
  }
}
