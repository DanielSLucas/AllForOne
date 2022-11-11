import { Test, TestingModule } from '@nestjs/testing';

import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

describe('OtpController', () => {
  let otpController: OtpController;
  let otpService: OtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [
        {
          provide: OtpService,
          useValue: {
            sendOtp: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    otpController = module.get<OtpController>(OtpController);
    otpService = module.get<OtpService>(OtpService);
  });

  it('should be defined', () => {
    expect(otpController).toBeDefined();
    expect(otpService).toBeDefined();
  });

  describe('sendOtp', () => {
    it('should be able to send an otp to an user cellphone', async () => {
      const userCellphone = 'user_cellphone';
      const sendOtpFunc = jest.spyOn(otpService, 'sendOtp');

      const result = await otpController.sendOtp({ cellphone: userCellphone });

      expect(result).toEqual({
        message: 'OTP sent with success.',
      });
      expect(sendOtpFunc).toHaveBeenCalledWith(userCellphone);
    });
  });

  describe('deleteOtp', () => {
    it('should be able to delete all otps related to an user id', async () => {
      jest.spyOn(otpService, 'delete').mockResolvedValueOnce({
        acknowledged: true,
        deletedCount: 1,
      });

      const result = await otpController.deleteOtp('user_id');

      expect(result).toEqual({
        message: 'success',
        deletedCount: 1,
      });
    });
  });
});
