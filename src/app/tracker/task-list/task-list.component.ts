import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrackerList } from '../model/tracker.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<TrackerList>([]);
  taskLists: TrackerList[];
  @Input() set taskList(task) {
    this.taskLists = task.taskList;
    if (this.taskLists.length > 0) {
      this.dataSource.data = this.taskLists;
      if (this.displayedColumns.length === 1) this.displayedColumns = ['index', 'taskName', 'type', 'date', 'action'];
    } else {
      this.displayedColumns = ['noData'];
    }
  }
  @Input() label: string;
  @Output() editTask = new EventEmitter();
  @Output() removeTask = new EventEmitter();
  @Output() completeTask = new EventEmitter();
  @Output() sendMailEvent = new EventEmitter();
  pendingTask: boolean = true;
  completedTask: boolean = true;
  pageSize = 5;
  currentPageIndex = 0;
  displayedColumns: string[] = ['index', 'taskName', 'type', 'date', 'action'];

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  trackById(index: number, task: TrackerList): string {
    return task.id;
  }
  pageEvent(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  onEditTask(task: TrackerList) {
    this.editTask.emit(task);
  }
  onCompleteTask(task: TrackerList) {
    this.completeTask.emit(task);
  }
  onRemoveTask(task: TrackerList) {
    this.removeTask.emit(task);
  }
  sendMail() {
    this.sendMailEvent.emit(this.label);
  }
}
