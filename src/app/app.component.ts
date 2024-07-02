import { Component, OnInit, computed, signal } from '@angular/core';
import { DataService } from './services/data-service.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Learning';
  name = '';
  url = 'ws://localhost:8080';
  items: string[] = [];
  page = 1;
  limit = 5;
  messages: string[] = [];
  public message: string;

  a = signal(10);
  b = signal(20);
  c = computed(() => this.a() + this.b());
  data = signal<any>({});

  constructor(private dataService: DataService, private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.loadMore();
    console.log(this.c());
    this.a.set(30);
    console.log(this.c());
    this.dataService.getObservableData().subscribe({
      next: (result) => {
        this.data.update((data) => data = result);
        
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
    this.createConnection();

  }

  private createConnection() {
    this.wsService.connect(this.url).subscribe(message => {
      this.messages.push(message);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('WebSocket Connection Closed');
    });
  }

  sendMessage() {
    this.wsService.connect(this.url).next({message: this.message});
    this.message = '';
  }

  loadMore() {
    const newItems = this.dataService.getData(this.page, this.limit);
    this.items = [...this.items, ...newItems];
    this.page++;
    // this.dataService.getPromiseData().then(result => {
      // this.data = result;
    // }).catch(error => {
    //   console.error('Error fetching data', error);
    // });
  }

  updateData() {
    console.log(this.data());
    this.data.update((data) => data = { ...data, title: "Learning" , body:'Angular Concepts'});
    console.log(this.data());
  }

  onScroll() {
    this.loadMore();
  }

  public isSpecial(text: string) {

    let tempText = this.alterText(text);
    return text === tempText;

  }

  public alterText(text: string) {
    return text;
  }


}
function f(x: string) {
  x = 'x-' + x;
  return function (y: string) {
    y = 'y-' + x;
    return function (z: string) {
      return 'z-' + y;
    }
  }
}
let g = f('a')('b')('c');
console.log(g);