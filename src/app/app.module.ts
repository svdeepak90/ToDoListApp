import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveQuotesPipe } from './pipes/remove-quotes.pipe';
import { TrackerComponent } from './tracker/tracker.component';
import { AddTrackerFormComponent } from './tracker/add-tracker-form/add-tracker-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskListComponent } from './tracker/task-list/task-list.component';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
    SidebarComponent,
    SliderComponent,
    TrackerComponent,
    AddTrackerFormComponent,
    TaskListComponent,
    LoginComponent,
    RegisterComponent,
    RemoveQuotesPipe
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    StoreModule.forRoot({auth: authReducer}, {
      metaReducers: [localStorageSyncReducer] // Add this line
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}