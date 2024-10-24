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
  selector: 'app-register-form',
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
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (!this.registerForm.valid) return;

    this.isLoading = true;
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
}

