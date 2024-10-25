import { Component } from '@angular/core';

import { AuthComponent } from '../../shared/layouts/auth/auth.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthComponent, RegisterFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
