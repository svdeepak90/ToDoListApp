import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackerList } from '../model/tracker.model';

@Component({
  selector: 'app-add-tracker-form',
  templateUrl: './add-tracker-form.component.html',
  styleUrl: './add-tracker-form.component.scss'
})
export class AddTrackerFormComponent {
  taskForm: FormGroup;
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
