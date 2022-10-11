import { Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';

@Injectable()
export class OtpProvider {
  generateOtp(length: number) {
    const otpDigits = [];

    for (let i = 0; i < length; i++) {
      otpDigits.push(randomInt(10));
    }

    return otpDigits.join('');
  }

  async sendOTP(cellphone: string, otp: string) {
    console.log(`TO:  ${cellphone}\nOTP: ${otp}`);
  }
}
