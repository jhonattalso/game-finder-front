import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Requisito: "Signal" para feedback e "Form" para os dados
  userData = { username: '', password: '' };
  message = signal<string>('');

  efetuarRegistro() {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.message.set('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => this.message.set('Erro ao criar conta. Tente outro nome de utilizador.')
    });
  }
}
