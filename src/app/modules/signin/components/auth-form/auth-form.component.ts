import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

import { FormWrapperComponent } from '../../../../shared/components/form-wrapper/form-wrapper.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    FormWrapperComponent,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  public loginForm: FormGroup;
  private _isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (!this.loginForm.valid) return;

    this._isLoading = true;

    const emailField = this.getField('email');
    const passwordField = this.getField('password');

    this.authService
      .login({
        email: emailField.value,
        password: passwordField.value,
      })
      .subscribe({
        next: (user) => {
          console.log('Signed in >>> ', user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log('Error >>>> ', error);
        },
        complete: () => {
          this._isLoading = false;
        },
      });
  }

  public emailIsInvalid(): boolean {
    const emailField = this.getField('email');
    if (!emailField) {
      return false;
    }

    return emailField.invalid && emailField.touched;
  }

  public passwordIsInvalid(): boolean {
    const passwordField = this.getField('password');
    if (!passwordField) {
      return false;
    }

    return passwordField.invalid && passwordField.touched;
  }

  public isLoading(): boolean {
    return this._isLoading;
  }

  private getField(name: string): AbstractControl<any, any> {
    const field = this.loginForm.get(name);
    if (!field) {
      throw new Error(`Field not found: ${name}`);
    }

    return field;
  }
}
