import { Component, inject, OnInit, signal } from '@angular/core';
import { TrackerService } from '../services/tracker-service.service';
import { TrackerList } from './model/tracker.model';
import { AddTrackerFormComponent } from './add-tracker-form/add-tracker-form.component';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit {
  taskItem = signal<TrackerList>(undefined);
  trackerList: TrackerList[] = [];
  index = 0;
  deletedItem: TrackerList;
  pendingTaskList: TrackerList[] = [];
  completedTaskList: TrackerList[] = [];
  constructor(public trackerService: TrackerService) { }

  ngOnInit(): void {
    this.trackerService.getAllTasks().subscribe(val => {
      this.trackerList = val;
      this.getaggregatedTasks('both');
    });
  }
  onAddItem(task?) {
    this.trackerService.addForm.update(val => val = !val);
  }
  onAddTask(task: TrackerList, action?) {
    const index = this.trackerService.findIndexByValue(this.trackerList, 'id', task.id);
    if (index !== -1) {
      this.trackerService.onEditDetails(task).subscribe(val => {
        const newItems = [...this.trackerList];
        newItems[index] = { ...newItems[index], ...task };
        this.trackerList = newItems;
        this.getaggregatedTasks('both');
      });
    } else {
      if (action !== 'undo') task.id =  this.trackerService.generateUniqueId();
      this.trackerService.onAddDetails(task).subscribe(val => {
        if (action === 'undo') {
          this.undoDelete();
        } else {
          this.trackerList = this.trackerList.concat(task);
        }
        this.getaggregatedTasks(task.status);
      });
    }
  }
  onRemoveTask(task: TrackerList) {
    const index = this.trackerService.findIndexByValue(this.trackerList, 'id', task.id);
    this.trackerService.deleteTask(task).subscribe(val => {
      this.index = index;
      this.deletedItem = {
          "taskName": task.taskName,
          "type": task.type,
          "date": task.date,
          "status": task.status,
          "id": task.id
      };
      this.trackerList = this.trackerList.filter(item => item.id !== task.id);
      setTimeout(() => {
        this.deletedItem = undefined;
      }, 150000);
      this.getaggregatedTasks(task.status);
    });
  }
  undoDeleteItem() {
    this.onAddTask(this.deletedItem, 'undo');
  }
  undoDelete() {
    const newItems = [...this.trackerList];
    newItems.splice(this.index, 0, this.deletedItem);
    this.trackerList = newItems;
    this.deletedItem = undefined;
  }
  onEditTask(task: TrackerList) {
    this.taskItem.update((val) => val = { ...val, ...task });
    this.trackerService.addForm.update(val => val = true);
  }
  onCompleteTask(task: TrackerList) {
    task.status = 'completed';
    this.onAddTask(task, 'completed');
  }
  getaggregatedTasks(status) {
    switch (status) {
      case 'pending': {
        this.pendingTaskList = this.pendingTasks;
        break;
      }
      case 'completed': {
        this.completedTaskList = this.completedTasks;
        break;
      }
      default: {
        this.pendingTaskList = this.pendingTasks;
        this.completedTaskList = this.completedTasks;
      }
    }
  }
  get pendingTasks(): TrackerList[] {
    let task = this.trackerList.filter(val =>
      val.status === 'pending'
    );
    return task;
  }
  get completedTasks() {
    let task = this.trackerList.filter(val =>
      val.status === 'completed'
    );
    return task;
  }
  onSendMail(list) {
    this.sendEmail(list);
  }
  sendEmail(list?): void {
    const emailData = {
      recipient: 'xxxx@xxxx.xxx',
      subject: 'Pending/Completed Tasks',
      reportData: list ? list : this.trackerList
    };

    this.trackerService.sendEmail(emailData).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }
}
