import { createHash, pbkdf2Sync } from 'crypto';
import { config } from 'dotenv';

config();

export function crypt(password: string): string {
  return pbkdf2Sync(
    password,
    process.env.CRYPT_SALT,
    Number(process.env.CRYPT_ITERATIONS),
    Number(process.env.CRYPT_KEY_LENGTH),
    process.env.CRYPT_ALG
  ).toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  const key = pbkdf2Sync(
    password,
    process.env.CRYPT_SALT,
    Number(process.env.CRYPT_ITERATIONS),
    Number(process.env.CRYPT_KEY_LENGTH),
    process.env.CRYPT_ALG
  ).toString('hex');
  
  return key === hash;
}
