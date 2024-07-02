import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  items: string[] = [];
  private throttle: boolean = false;

  ngOnInit(): void {
    this.loadItems();
  }

  onScroll(event: any): void {
    const element = event.target;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if (atBottom && !this.throttle) {
      this.throttle = true;
      setTimeout(() => {
        this.loadItems();
        this.throttle = false;
      }, 100);
    }
  }

  private loadItems(): void {
    if (this.items.length > 100) {
      return;
    }
    for (let i = 0; i < 20; i++) {
      this.items.push(`Item ${this.items.length + 1}`);
    }
  }
}
