import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(cellphone: string, otp: string) {
    try {
      const user = await this.usersService.findByCellphone(cellphone);

      const { password, createdAt } = await this.otpService.findOtpByUserId(
        user._id,
      );

      const createdAtTimestamp = new Date(createdAt).getTime();
      const minutesToExpire = this.configService.get<number>(
        'OTP_MINUTES_TO_EXPIRE',
      );
      const tenMinutesInMilliseconds = minutesToExpire * 60 * 1000; // Xmin * 60sec * 1000ms
      const createdLessThanTenMinutes =
        Date.now() < createdAtTimestamp + tenMinutesInMilliseconds;

      await this.otpService.delete(user._id);

      if (createdLessThanTenMinutes && otp === password) {
        return user;
      }

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Wrong user/password');
      }
      return null;
    }
  }

  async login(user: UserDocument) {
    const payload = {
      user: { name: user.name, cellphone: user.cellphone },
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
