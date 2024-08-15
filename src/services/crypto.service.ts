import { Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

@Injectable()
export class CryptoService {
  constructor() {}
  public encrypt(password: string): string {
    return pbkdf2Sync(
      password,
      process.env.CRYPT_SALT,
      Number(process.env.CRYPT_ITERATIONS),
      Number(process.env.CRYPT_KEY_LENGTH),
      process.env.CRYPT_ALG
    ).toString('hex');
  }
  
  public verifyPassword(password: string, hash: string): boolean {
    const key = pbkdf2Sync(
      password,
      process.env.CRYPT_SALT,
      Number(process.env.CRYPT_ITERATIONS),
      Number(process.env.CRYPT_KEY_LENGTH),
      process.env.CRYPT_ALG
    ).toString('hex');
    
    return key === hash;
  }
}

