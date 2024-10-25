import { Component } from '@angular/core';

import { AuthComponent } from '../../shared/layouts/auth/auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AuthComponent, AuthFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {}
