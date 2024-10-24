import { Component } from '@angular/core';

import { MainComponent } from '../../shared/layouts/main/main.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MainComponent, RegisterFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
