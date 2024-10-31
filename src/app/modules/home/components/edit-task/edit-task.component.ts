import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskModel } from '../../../../core/models/tasks/task.model';
import { TaskUpdateModel } from '../../../../core/models/tasks/task-update.model';
import { TaskService } from '../../../../core/services/task/task.service';
import { CustomDialogComponent } from '../../../../shared/components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    CustomDialogComponent,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  private taskSelectedId: string;
  public isNew: boolean = true;
  public isLoading: boolean = false;

  public editForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: Record<string, any>,
    private readonly taskService: TaskService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.taskSelectedId = dialogData?.['taskSelectedId'];
    this.isNew = dialogData?.['isNew'] ?? true;

    this.editForm = this.formBuilder.group({
      title: [
        dialogData?.['title'],
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(80),
        ],
      ],
      description: [
        dialogData?.['description'],
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      deadline: [dialogData?.['deadline'], Validators.required],
      status: [dialogData?.['status'], Validators.required],
      level: [dialogData?.['level'], Validators.required],
    });
  }

  public onCancelClick(taskCreatedOrUpdated?: TaskModel | null): void {
    this.dialogRef.close({
      saved: !!taskCreatedOrUpdated,
      taskCreatedOrUpdated,
    });
  }

  public onSaveClick(): void {
    if (!this.editForm.valid) return;

    this.isLoading = true;
    const task = this.editForm.value as TaskUpdateModel;
    const actionResult = this.isNew
      ? this.taskService.createTask(task)
      : this.taskService.updateTask(this.taskSelectedId, task);

    actionResult.subscribe({
      next: (result) => {
        this.onCancelClick(result.body);
        this.isLoading = false;
      },
      error: (error) => {
        const errorMessage =
          error instanceof HttpErrorResponse
            ? error.error.body.message
            : error.message;
        this.showNotification(
          errorMessage || 'Ha ocurrido un error inesperado',
        );
        this.isLoading = false;
      },
    });
  }

  public hasError(fieldName: string, errorName: string) {
    const field = this.getField(fieldName);

    const error = field.errors?.[errorName];

    return error;
  }

  private getField(name: string): AbstractControl<any, any> {
    const field = this.editForm.get(name);
    if (!field) {
      throw new Error(`Field not found: ${name}`);
    }

    return field;
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
  }
}
