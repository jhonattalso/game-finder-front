import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  credentials = {
    username: '',
    password: ''
  };

  errorMessage = signal<string | null>(null);

  efetuarLogin() {
    this.errorMessage.set(null);

    // Chama o serviço que comunica com o SecurityController do back-end
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // Após o back-end validar o JWT, mudamos o utilizador para a tela principal
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage.set('Falha no login. Verifique o utilizador e a senha.');
        console.error('Erro no login', err);
      }
    });
  }
}
