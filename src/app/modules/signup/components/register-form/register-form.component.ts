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
  selector: 'app-register-form',
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
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  public registerForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onRegisterSubmit(): void {
    if (!this.registerForm.valid) return;

    this.isLoading = true;

    const emailField = this.getField('email');
    const passwordField = this.getField('password');

    this.authService
      .register({
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
            error.message || 'Error inesperado al registrarse',
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
    const field = this.registerForm.get(name);
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
