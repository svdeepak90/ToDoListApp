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
import { FormsModule } from '@angular/forms';
import { RemoveQuotesPipe } from './pipes/remove-quotes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
    SidebarComponent,
    SliderComponent,
    RemoveQuotesPipe
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
