import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrackerList } from 'src/app/tracker/model/tracker.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  readonly data = inject<TrackerList>(MAT_DIALOG_DATA);
  readonly task = model(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
