import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SseService } from '../services/sse.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SessionWatcherDirective } from '../directives/session-watcher.directive';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, SessionWatcherDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userName = '';
  // showWarning = false;
  // remainingSeconds = 0;
  // private autoLogoutTimer: any;

  // constructor(
  //   private router: Router,
  //   private sseService: SseService,
  //   private authService: AuthService
  // ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || '';
    // this.startListening();
  }

  // startListening() {
  //   this.sseService.start(
  //     (seconds) => this.handleWarning(seconds),
  //     () => this.handleExpired()
// This is NOT executed here.

// It is just:
// A function value
// Stored in memory
// Like assigning a variable
  //   );
  // }

// Multiple independent calls
// Triggered by SSE
// One per second

// handleWarning this function:
// Runs once per SSE message
// Finishes
// Then waits for the next event
  // handleWarning(seconds: number) {
  //   (this.remainingSeconds = seconds),
  //     (this.showWarning = true)

      // just in case 'expired' event isn't being sent, so after 10 sec from frontend, when backend sends last 1 second this will autologout
      // this.startFailsafe();
  // }



  // startFailsafe() {
    // console.log(this.autoLogoutTimer);

    // clearTimeout(this.autoLogoutTimer);
// Timers are NOT replaced automatically.
// Without clearTimeout, every second schedules a new logout.
// The variable exists to give you control.

    // this.autoLogoutTimer = setTimeout(() => {
    //   this.logout();
    // }, 10000);

// Internal working (simplified):
// 1️⃣ Browser registers a timer
// 2️⃣ “After 10 seconds, call this function”
// 3️⃣ JS continues executing normally
// 4️⃣ Timer sits in browser task queue
// JS does NOT pause execution

// setTimeout returns an ID & This ID is used to cancel it later.
// autoLogoutTimer = 12;
// }

  // handleExpired() {
    // we can skip this, added just for defensive approach in case Browser pauses timers
    // this.logout();
  // }

  // extendSession() {
  //   this.authService.extendSession().subscribe(() => {
  //     this.showWarning = false;
  //     // clearTimeout(this.autoLogoutTimer);
  //   });
  // }

  // logout() {
  //   this.sseService.stop();
    // console.log(this.autoLogoutTimer);
    // clearTimeout(this.autoLogoutTimer);
  //   localStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  // ngOnDestroy() {
  //   this.logout();
  // }
}
