import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = Array.from({ length: 166 }).map((_, i) => `Item #${i + 1}`);
  constructor(private http: HttpClient) { }
  getData(page: number, limit: number): string[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.data.slice(start, end);
  }
  getPromiseData(): Promise<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1').toPromise();
  }

  getObservableData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
}
