import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, LogoComponent, MatCardModule, RouterModule],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
})
export class FormWrapperComponent {}
