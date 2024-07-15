import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/reducers/auth.actions';
import { AuthState } from 'src/app/reducers/auth.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<{ auth: AuthState }>) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.login(user);
    }
  }

  login(user: User) {
    this.authService.login(user.userName).subscribe((val) => {
      if (val[0]?.password === user.password) {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
        localStorage.setItem(this.authService.getKey(), authToken);
        this.store.dispatch(login({user}));
        this.authService.setAuthentication(true);
        this.router.navigate([''])
      }
      else {
        this.error = 'Invalid User';
      }
    })
  }

}
