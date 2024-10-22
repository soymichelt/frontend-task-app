import { Routes } from '@angular/router';

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
