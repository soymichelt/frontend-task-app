import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async () => {
      const m = await import('./modules/home/home.component');
      return m.HomeComponent;
    },
    canActivate: [AuthGuard],
    data: { animation: 'home-page' },
  },
  {
    path: 'signin',
    loadComponent: async () => {
      const m = await import('./modules/signin/signin.component');
      return m.SigninComponent;
    },
    data: { animation: 'signin-page' },
  },
  {
    path: 'signup',
    loadComponent: async () => {
      const m = await import('./modules/signup/signup.component');
      return m.SignupComponent;
    },
    data: { animation: 'signup-page' },
  },
  {
    path: '**',
    loadComponent: async () => {
      const m = await import('./modules/404/404.component');
      return m.NotFound404Component;
    },
    data: { animation: '404-page' },
  },
];
