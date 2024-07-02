import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }
  private socket: WebSocket;
  private subject: Subject<any>;

  public connect(url: string): Subject<any> {
    if (!this.subject) {
      this.subject = this.createConnection(url);
    }
    return this.subject;
  }

  public createConnection(url: string): Subject<any> {
    this.socket = new WebSocket(url);

    const observable = new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
      return () => this.socket.close();
    })

    const observer = {
      next: (data: any) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data.message));
        }
      }
    }
    return Subject.create(observer, observable);
  }
}
