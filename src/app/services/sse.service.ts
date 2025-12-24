import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource?: EventSource;
  url = 'https://localhost:7084/api/Auth';

  start(
    onWarning: (seconds: number) => void, 
    onExpired: () => void) {
      
    this.eventSource = new EventSource(this.url + '/events');

    this.eventSource.addEventListener('warning', (event: MessageEvent) => {
      const seconds = Number(event.data);
      onWarning(seconds); // executes & Functions passed as arguments do NOTHING until they are explicitly called
    });

    this.eventSource.addEventListener('expired', () => {
      onExpired();
    });
  }

  stop() {
    this.eventSource?.close();
  }
}
