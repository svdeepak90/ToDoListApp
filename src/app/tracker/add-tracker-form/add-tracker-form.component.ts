import { Component, computed, EventEmitter, inject, input, model, Output } from '@angular/core';
import { TrackerList } from '../model/tracker.model';
import { TrackerService } from 'src/app/services/tracker-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tracker-form',
  templateUrl: './add-tracker-form.component.html',
  styleUrl: './add-tracker-form.component.scss'
})
export class AddTrackerFormComponent {
  taskForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<AddTrackerFormComponent>);
  readonly data = inject<TrackerList>(MAT_DIALOG_DATA);
  readonly taskData = model(this.data);
  @Output() addTask = new EventEmitter();
  task = input.required({
    transform: (value: TrackerList | null) => {
      if (!value) return null;
      let taskInput = {
        taskName: value.taskName,
        type: value.type,
        date: value.date,
        status: value.status
      }
      this.taskForm.setValue(taskInput);
      return value;
    },
  });
  taskEdit = computed(() => this.taskForm.setValue(this.task));

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      status: ['pending']
    })
  }
  onAddDetails() {
    if (this.taskForm.valid) {
      let addTracker: TrackerList = this.taskForm.value;
      addTracker = { ...addTracker, id: this.task() ? this.task()?.id : ''};
      this.addTask.emit(addTracker);
      this.reset();
    }
  }
  reset() {
    this.taskForm.reset();
    this.taskForm.patchValue({ status: 'pending' });
    if (this.task()) this.task().id = '-1';
  }
}
