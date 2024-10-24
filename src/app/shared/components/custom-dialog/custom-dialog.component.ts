import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
})
export class CustomDialogComponent {
  @Input() title!: string;
}

