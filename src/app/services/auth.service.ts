import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:7084/api/Auth';
  private http = inject(HttpClient);

  signup(user: any) {
    return this.http.post<{ message: string }>(this.url + '/sign-up', user);
  }

  login(user: any) {
    return this.http.post<{ name: string; message: string }>(
      this.url + '/authenticate',
      user
    );
  }

  extendSession() {
    return this.http.post(this.url + '/extend', {});
  }
}
