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
  },
  {
    path: 'signin',
    loadComponent: async () => {
      const m = await import('./modules/signin/signin.component');
      return m.SigninComponent;
    },
  },
  {
    path: 'signup',
    loadComponent: async () => {
      const m = await import('./modules/signup/signup.component');
      return m.SignupComponent;
    },
  },
];
