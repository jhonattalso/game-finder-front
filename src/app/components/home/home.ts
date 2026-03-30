import { Component, inject, signal, model, computed } from '@angular/core'; // Adicionado computed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Obrigatório para o model() no HTML
import { GameService } from '../../services/game.service';
import { GameCard } from '../../game-card/game-card';
import { RecommendationModel } from '../../../models/recommendation.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  authService = inject(AuthService);
  filtro = model('');
  private gameService = inject(GameService);

  jogos = [
    { nome: 'Elden Ring', slug: 'elden-ring' },
    { nome: 'Baldur’s Gate 3', slug: 'baldurs-gate-3' },
    { nome: 'God of War Ragnarok', slug: 'god-of-war-ragnarok' },
    { nome: 'Cyberpunk 2077', slug: 'cyberpunk-2077' },
    { nome: 'Need for Speed Heat', slug: 'need-for-speed-heat' },
    { nome: 'The Lord of the Rings: Gollum', slug: 'the-lord-of-the-rings-gollum' },
  ];

  jogosFiltrados = computed(() =>
    this.jogos.filter(j => j.nome.toLowerCase().includes(this.filtro().toLowerCase()))
  );

  logout() {
    this.authService.logout();
  }

  recommendations = signal<Record<string, RecommendationModel>>({});

  buscar(slug: string) {
    this.gameService.getRecommendation(slug).subscribe((res) => {
      this.recommendations.update((old) => ({ ...old, [slug]: res }));
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
