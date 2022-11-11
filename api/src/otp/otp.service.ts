import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { OtpProvider } from './providers/otp/local.provider';
import { Otp, OtpDocument } from './schemas/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name)
    private otpModel: Model<OtpDocument>,
    private usersService: UsersService,
    private otpProvider: OtpProvider,
  ) {}

  async sendOtp(cellphone: string) {
    const user = await this.usersService.findByCellphone(cellphone);

    await this.delete(user._id);

    const otp = await this.create(user._id);

    await this.otpProvider.sendOTP(user.cellphone, otp.password);
  }

  async findOtpByUserId(userId: string): Promise<OtpDocument> {
    const otp = await this.otpModel.findOne({
      user: userId,
    });

    if (!otp) {
      throw new NotFoundException('OTP not found!');
    }

    return otp;
  }

  async create(userId: string) {
    const otp = this.otpProvider.generateOtp(4);

    return this.otpModel.create({
      user: userId,
      password: otp,
      createdAt: new Date(),
    });
  }

  async delete(userId: string) {
    return this.otpModel.deleteMany({
      user: userId,
    });
  }
}
