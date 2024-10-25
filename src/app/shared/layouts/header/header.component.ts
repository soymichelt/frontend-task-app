import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean = false;
  public user!: any | null;
  public isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.isAuth = !!user;
        this.user = user;
      },
    });
  }

  public signout(): void {
    this.isLoading = true;
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
