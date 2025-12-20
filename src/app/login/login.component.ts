import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {}

  loginData = {
    email: '',
    password: '',
  };

  async login() {
    // debugger;
    const payload = {
      email: this.cryptoService.encrypt(this.loginData.email),
      password: await this.cryptoService.hashSHA256(this.loginData.password),
    };

    // console.log(typeof payload.password);
    // console.log(payload.password);
    
    this.authService.login(payload).subscribe({
      next: (res) => {
        // const crypt = new JSEncrypt();
        // crypt.setPrivateKey(res.privateKey);
        // const decryptedData = {
        //   name: crypt.decrypt(res.data.name) || '',
        //   email: crypt.decrypt(res.data.email) || '',
        //returns string:  when decryption successful
        //returns false:   when decryption fails but empty string in my case

        // alert(res.message), 
        localStorage.setItem('userName', res.name);
        this.router.navigate(['dashboard']);
      },
      error: (err) => alert(err.error.message),
    });
  }
}

// look for the folder structure as per the industry standard, placing component at one place for reuseablibity with customisation
// mvc (smaller) n mvp (bigger) -> architect
// coordinate with Rupali for AI/ML
