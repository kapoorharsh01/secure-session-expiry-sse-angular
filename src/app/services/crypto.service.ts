import { Injectable } from '@angular/core';
import JSEncrypt from 'jsencrypt';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private encryptor = new JSEncrypt();

  constructor() {
    this.encryptor.setPublicKey(environment.rsaPublicKey);
  }

  encrypt(value: string): string | false {
    const encrypted = this.encryptor.encrypt(value);

    if (!encrypted) throw new Error('Encryption failed');

    return encrypted;
  }

  async hashSHA256(value: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
