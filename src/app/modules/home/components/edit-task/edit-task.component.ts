import { CommonModule } from '@angular/common';
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
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  public isNew: boolean = true;

  public editForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: Record<string, any>,
  ) {
    this.editForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(80),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  public onCancelClick(): void {
    this.dialogRef.close();
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
}

