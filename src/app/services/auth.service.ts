import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse, UserCredentials } from '../../models/auth.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  // Signal para controlar se o utilizador está logado em toda a app
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: UserCredentials) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.saveToken(res.token))
    );
  }

  register(credentials: UserCredentials) {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }
}
