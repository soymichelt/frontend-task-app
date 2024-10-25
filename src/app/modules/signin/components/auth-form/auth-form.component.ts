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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { FormWrapperComponent } from '../../../../shared/components/form-wrapper/form-wrapper.component';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule,
    FormWrapperComponent,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  public loginForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (!this.loginForm.valid) return;

    this.isLoading = true;

    const emailField = this.getField('email');
    const passwordField = this.getField('password');

    this.authService
      .login({
        email: emailField.value,
        password: passwordField.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error) => {
          this.showNotification(
            error.message || 'Error inesperado al inicar sesión',
          );
          this.isLoading = false;
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

  private getField(name: string): AbstractControl<any, any> {
    const field = this.loginForm.get(name);
    if (!field) {
      throw new Error(`Field not found: ${name}`);
    }

    return field;
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
  }
}
