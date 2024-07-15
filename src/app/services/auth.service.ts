import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(private user: UserService) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  login(userName: string): Observable<User> {
    return this.user.getUser(userName);
  }

  setAuthentication(val) {
    this.isAuthenticated = val;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }

  getKey() {
    return this.authSecretKey;
  }
}
