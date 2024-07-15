import { Component, NgZone, OnInit, computed, signal } from '@angular/core';
import { DataService } from './services/data-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}