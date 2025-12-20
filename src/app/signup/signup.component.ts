import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {}

  userForm = {
    fullName: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    password: '',
  };

  async signup() {
    const payload = {
      ...this.userForm,
      fullName: this.cryptoService.encrypt(this.userForm.fullName),
      mobile: this.cryptoService.encrypt(this.userForm.mobile),
      email: this.cryptoService.encrypt(this.userForm.email),
      password: await this.cryptoService.hashSHA256(this.userForm.password),
    };
    //also try encrypting the whole object instead of individual values & add on provider or directive for global sse & debugger for deep analysis 

    this.authService.signup(payload).subscribe({
      next: () => this.router.navigate(['login']),
      error: (err) => alert(err.error.message),
    });
  }
}
