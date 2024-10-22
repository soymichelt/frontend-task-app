import { Component } from '@angular/core';

import { AuthComponent } from '../../shared/layouts/auth/auth.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {}
