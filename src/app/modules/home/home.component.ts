import { Component } from '@angular/core';

import { MainComponent } from '../../shared/layouts/main/main.component';
import { ListsComponent } from '../../shared/components/lists/lists.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, ListsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
