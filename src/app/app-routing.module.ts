import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './guards/auth.guard';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: TrackerComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
