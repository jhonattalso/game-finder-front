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

  // Objeto para armazenar os dados do formulário
  // Cumpre o requisito "Form"
  credentials = {
    username: '',
    password: ''
  };

  // Signal para gerir mensagens de erro (Requisito "Signal")
  errorMessage = signal<string | null>(null);

  efetuarLogin() {
    this.errorMessage.set(null); // Limpa erros anteriores

    // Chama o serviço que comunica com o SecurityController do back-end
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // PASSO 5: Navegação Programática
        // Após o back-end validar o JWT, mudamos o utilizador para a tela principal
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Uso de Signal para feedback visual ao utilizador
        this.errorMessage.set('Falha no login. Verifique o utilizador e a senha.');
        console.error('Erro no login', err);
      }
    });
  }
}
