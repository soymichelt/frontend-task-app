import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ListsComponent } from '../../shared/components/lists/lists.component';
import { MainComponent } from '../../shared/layouts/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, ListsComponent, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
