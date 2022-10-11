import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateOtpDTO } from './dtos/create-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post()
  async sendOtp(@Body() { cellphone }: CreateOtpDTO) {
    await this.otpService.sendOtp(cellphone);

    return { message: 'OTP sent with success.' };
  }

  @Delete()
  async deleteOtp(@Query('userId') userId: string) {
    const deleteResult = await this.otpService.delete(userId);

    return { message: 'success', deletedCount: deleteResult.deletedCount };
  }
}
