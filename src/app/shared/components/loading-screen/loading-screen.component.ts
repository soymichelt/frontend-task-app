import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent {}
