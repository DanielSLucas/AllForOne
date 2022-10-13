import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { OtpProvider } from './providers/otp/local.provider';
import { Otp, OtpSchema } from './schemas/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    UsersModule,
  ],
  controllers: [OtpController],
  providers: [OtpService, OtpProvider],
  exports: [OtpService],
})
export class OtpModule {}
