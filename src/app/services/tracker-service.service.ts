import { Injectable, signal } from '@angular/core';
import { TrackerList } from '../tracker/model/tracker.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  addForm = signal(false);
  private apiUrl = 'http://localhost:3000/tasks';
  private emailUrl = 'http://localhost:3010/send-email';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get<TrackerList[]>(`${this.apiUrl}`);
  }
  findIndexByValue(array: any[], key: string, value: any): number {
    return array.findIndex(item => item[key] === value);
  }
  onAddDetails(addTracker: TrackerList) {
    return this.http.post(`${this.apiUrl}`, addTracker, this.httpOptions);
  }
  onEditDetails(addTracker: TrackerList) {
    return this.http.put(`${this.apiUrl}/${addTracker.id}`, addTracker, this.httpOptions);
  }
  deleteTask(task) {
    return this.http.delete(`${this.apiUrl}/${task.id}`);
  }
  generateUniqueId(): string {
    return uuidv4();
  }
  sendEmail(data): Observable<any> {
    return this.http.post<any>(this.emailUrl, data);
  }
}
