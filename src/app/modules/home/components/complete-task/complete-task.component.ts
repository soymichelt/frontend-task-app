import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService } from '../../../../core/services/task/task.service';
import { CustomDialogComponent } from '../../../../shared/components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-complete-task',
  standalone: true,
  imports: [
    CustomDialogComponent,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './complete-task.component.html',
  styleUrl: './complete-task.component.scss',
})
export class CompleteTaskComponent {
  public taskId: string;
  public title: string;
  public isLoading: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<CompleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: Record<string, any>,
    private readonly taskService: TaskService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.taskId = dialogData?.['taskId'];
    this.title = dialogData?.['title'];
  }

  public handleCancelClick(completed: boolean = false): void {
    this.dialogRef.close({ completed });
  }

  public handleCompleteClick(): void {
    this.isLoading = true;
    this.taskService.updateStatusTask(this.taskId, 'DONE').subscribe({
      next: () => {
        this.handleCancelClick(true);
      },
      error: (error) => {
        this.showNotification(
          error.message || 'Ha ocurrido un error inesperado',
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
