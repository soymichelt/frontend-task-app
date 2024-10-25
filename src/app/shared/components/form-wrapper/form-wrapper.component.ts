import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage, RouterModule],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
})
export class FormWrapperComponent {}
