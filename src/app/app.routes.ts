// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// Se o arquivo é login.ts, o caminho termina em /login
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
