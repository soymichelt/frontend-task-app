import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ListsComponent } from '../../shared/components/lists/lists.component';
import { MainComponent } from '../../shared/layouts/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EditTaskComponent,
    ListsComponent,
    MainComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly dialog: MatDialog) {}

  public showEditTaskDialog(): void {
    this.dialog.open(EditTaskComponent, {
      maxWidth: '540px',
      width: 'calc(100% - 40px)',
    });
  }
}
