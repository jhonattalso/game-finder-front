import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // CommonModule é necessário para usar *ngIf ou @if
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav *ngIf="authService.isAuthenticated()">
      <span>Bem-vindo ao Game Finder</span>
      <button (click)="logout()">Sair</button>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    nav { display: flex; justify-content: space-between; padding: 1rem; background: #eee; }
  `]
})
export class App {
  // Injetamos o serviço para verificar o estado de autenticação
  authService = inject(AuthService);

  logout() {
    this.authService.logout(); // Remove o token e atualiza o signal de autenticação
  }
}



// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   template: `<router-outlet></router-outlet>`, // Renderiza o componente da rota ativa
// })
// export class App {}


// import { Component, inject } from '@angular/core';
// import { RouterOutlet, RouterLink, Router } from '@angular/router'; // Necessário para Navegação [cite: 3]
// import { CommonModule } from '@angular/common';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   standalone: true, // Padrão das versões recentes [cite: 3]
//   imports: [CommonModule, RouterOutlet, RouterLink], // Importe o RouterOutlet aqui
//   templateUrl: './app.html',
//   styleUrl: './app.css',
// })
// export class App {
//   authService = inject(AuthService); // Injeta o serviço de autenticação
//   router = inject(Router);

//   // Método para o botão de sair (requisito de segurança JWT)
//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }
