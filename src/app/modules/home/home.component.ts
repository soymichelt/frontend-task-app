import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ListsComponent } from '../../shared/components/lists/lists.component';
import { MainComponent } from '../../shared/layouts/main/main.component';
import {
  TaskGroupList,
  TaskItem,
} from '../../shared/components/lists/lists.model';
import { TaskService } from '../../core/services/task/task.service';
import {
  calculatePercentageTaskCompleted,
  mapToTaskGroup,
} from '../../shared/utils/tasks/tasks.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EditTaskComponent,
    ListsComponent,
    MainComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public tasksGroup: TaskGroupList = {
    TODO: [],
    IN_PROGRESS: [],
    TEST: [],
    ON_HOLD: [],
    DONE: [],
  };
  public percentageTasksCompleted: number | null = null;

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.getTasks();
  }

  public refreshTasks(): void {
    this.getTasks();
  }

  public showCreateTask(): void {
    this.showEditTaskDialog({ isNew: true });
  }

  public showCreateTaskWithGroupSelected(groupSelected: string): void {
    this.showEditTaskDialog({
      status: groupSelected,
      isNew: true,
    });
  }

  public showEditTask(item: TaskItem): void {
    this.showEditTaskDialog({
      ...item,
      isNew: false,
    });
  }

  private showEditTaskDialog(data?: Record<string, any>): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      maxWidth: '540px',
      width: 'calc(100% - 40px)',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.['saved']) {
        this.getTasks();
      }
    });
  }

  private getTasks(): void {
    this.isLoading = true;

    this.taskService.getTasks().subscribe({
      next: (result) => {
        this.tasksGroup = mapToTaskGroup(result);
        this.percentageTasksCompleted =
          calculatePercentageTaskCompleted(result);
      },
      error: (error) => {
        this.showNotification(
          error.message || 'Error inesperado al obtener las tareas',
        );
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
  }
}
