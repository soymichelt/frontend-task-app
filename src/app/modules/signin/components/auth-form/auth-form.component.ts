import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit() {
    if (!this.loginForm.valid) return;

    this.markAsLoading();

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.markAsLoaded();
      },
      error: (error) => {
        const errorMessage =
          error instanceof HttpErrorResponse
            ? error.error.body.message
            : error.message;
        this.showNotification(
          errorMessage || 'Error inesperado al inicar sesión',
        );
        this.markAsLoaded();
      },
    });
  }

  public hasError(fieldName: string, errorName: string) {
    const field = this.getField(fieldName);

    const error = field.errors?.[errorName];

    return error;
  }

  private getField(name: string): AbstractControl<any, any> {
    const field = this.loginForm.get(name);
    if (!field) {
      throw new Error(`Field not found: ${name}`);
    }

    return field;
  }

  private markAsLoading(): void {
    this.isLoading = true;

    const emailField = this.getField('email');
    const passwordField = this.getField('password');

    emailField.disable();
    passwordField.disable();
  }

  private markAsLoaded(): void {
    this.isLoading = false;

    const emailField = this.getField('email');
    const passwordField = this.getField('password');

    emailField.enable();
    passwordField.enable();
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
  }
}
