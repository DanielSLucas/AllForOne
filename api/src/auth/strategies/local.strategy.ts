import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(cellphone: string, otp: string): Promise<any> {
    const user = await this.authService.validateUser(cellphone, otp);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
