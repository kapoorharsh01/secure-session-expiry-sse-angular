import { Directive} from '@angular/core';
import { SseService } from '../services/sse.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appSessionWatcher]', //Attaches the directive to the element & run it's lifecycle
  exportAs: 'session' //access directive class members/properties
})
export class SessionWatcherDirective {

  showWarning = false;
  remainingSeconds = 0;

  constructor(private router: Router,
    private sseService: SseService,
    private authService: AuthService) {}

  ngOnInit(){
    this.sseService.start(
      (seconds) => this.handleWarning(seconds),
      () => this.handleExpired()
    )
  }

  handleWarning(seconds: number){
    this.remainingSeconds = seconds,
    this.showWarning = true
  }

  handleExpired(){
    this.logout();
  }

  logout(){
    this.sseService.stop();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  extendSession() {
    this.authService.extendSession().subscribe(() => {
      this.showWarning = false;
    });
  }

}
