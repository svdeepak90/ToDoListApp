import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../reducers/auth.actions';
import { AuthState } from '../reducers/auth.reducer';
import { selectUser } from '../reducers/auth.selectors';
import { AuthService } from '../services/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = 'Thiri';
  isLoggedIn = false;
  user$: Observable<User>;
  constructor(public authService: AuthService, private route: Router, private store: Store<{auth: AuthState}>) {
    this.isLoggedIn = this.authService.isAuthenticatedUser();
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(logout());
    this.route.navigate(['/login']);
  }
}
