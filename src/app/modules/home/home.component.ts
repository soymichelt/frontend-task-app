import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TaskService } from '../../core/services/task/task.service';
import { ListsComponent } from '../../shared/components/lists/lists.component';
import {
  TaskGroupList,
  TaskItem,
} from '../../shared/components/lists/lists.model';
import { MainComponent } from '../../shared/layouts/main/main.component';
import {
  calculatePercentageTaskCompleted,
  mapToTaskGroup,
} from '../../shared/utils/tasks/tasks.utils';
import { CompleteTaskComponent } from './components/complete-task/complete-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

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
  public isTasksLoading: boolean = false;
  public tasksGroup: TaskGroupList = {
    TODO: [],
    IN_PROGRESS: [],
    TEST: [],
    ON_HOLD: [],
    DONE: [],
  };
  public percentageTasksCompleted: number | null = null;

  private getTasksSubject = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.initializeGetTasksSubject();
  }

  public ngOnInit(): void {
    this.getTasks();
  }

  public handleRefreshTasks(): void {
    this.executeGetTasks();
  }

  public handleCompleteTaskClick(task: TaskItem): void {
    this.showCompleteTaskDialog({
      taskId: task.taskId,
      title: task.title,
    });
  }

  public handleDeleteTaskClick(task: TaskItem): void {
    this.showDeleteTaskDialog({
      taskId: task.taskId,
      title: task.title,
    });
  }

  public handleUpdateTaskStatus(changes: {
    task: TaskItem;
    newStatus: string;
  }): void {
    const { task, newStatus } = changes;
    if (task.status === newStatus) return;

    this.updateStatus(task.taskId, newStatus);
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
      if (result?.saved) {
        this.executeGetTasks();
      }
    });
  }

  private showDeleteTaskDialog(data: Record<string, any>): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      maxWidth: '540px',
      width: 'calc(100% - 40px)',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.deleted) {
        this.executeGetTasks();
      }
    });
  }

  private showCompleteTaskDialog(data: Record<string, any>): void {
    const dialogRef = this.dialog.open(CompleteTaskComponent, {
      maxWidth: '540px',
      width: 'calc(100% - 40px)',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.completed) {
        this.executeGetTasks();
      }
    });
  }

  private getTasks(): void {
    this.isTasksLoading = true;

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
        this.isTasksLoading = false;
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

  private updateStatus(taskId: string, status: string): void {
    this.taskService
      .updateStatusTask(taskId, status)
      .pipe(debounceTime(10000))
      .subscribe({
        next: () => {
          this.executeGetTasks();
        },
        error: (error) => {
          this.showNotification(
            error.message || 'Error inesperado al obtener las tareas',
          );
        },
      });
  }

  private initializeGetTasksSubject(): void {
    this.getTasksSubject
      .pipe(debounceTime(1000))
      .subscribe(() => this.getTasks());
  }

  private executeGetTasks(): void {
    this.getTasksSubject.next();
  }
}
