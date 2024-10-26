import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from '../../shared/layouts/main/main.component';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [MainComponent, NgOptimizedImage, RouterModule],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss',
})
export class NotFound404Component {}
