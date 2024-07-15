import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/users';

  getUser(userName: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?userName=${userName}`);
  }
}