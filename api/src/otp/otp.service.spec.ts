import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';

import { FakeModel } from '../helpers/fakeModel.helper';
import { UsersService } from '../users/users.service';
import { OtpService } from './otp.service';
import { OtpProvider } from './providers/otp/local.provider';
import { Otp, OtpDocument } from './schemas/otp.schema';

describe('OtpService', () => {
  let otpService: OtpService;
  let otpModel: Model<OtpDocument>;
  let usersService: UsersService;
  let otpProvider: OtpProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: getModelToken(Otp.name),
          useValue: new FakeModel<Otp>(),
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
            findByCellphone: jest.fn(),
          },
        },
        {
          provide: OtpProvider,
          useValue: {
            generateOtp: jest.fn().mockReturnValue('1234'),
            sendOTP: jest.fn(),
          },
        },
      ],
    }).compile();

    otpService = module.get<OtpService>(OtpService);
    otpModel = module.get<Model<OtpDocument>>(getModelToken(Otp.name));
    usersService = module.get<UsersService>(UsersService);
    otpProvider = module.get<OtpProvider>(OtpProvider);
  });

  it('should be defined', () => {
    expect(otpService).toBeDefined();
    expect(otpModel).toBeDefined();
    expect(usersService).toBeDefined();
    expect(otpProvider).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a new otp', async () => {
      const generateOtpFunc = jest.spyOn(otpProvider, 'generateOtp');

      const result = await otpService.create('user_id');

      expect(generateOtpFunc).toHaveBeenCalled();
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('createdAt');
    });
  });

  describe('delete', () => {
    it('should be able to delete an otp', async () => {
      const userId = 'user_id';
      const otp = await otpService.create(userId);

      const otpBeforeDeletion = await otpService.findOtpByUserId(userId);
      expect(otpBeforeDeletion).toBe(otp);

      await expect(otpService.delete(userId)).resolves.not.toThrow();

      await expect(otpService.findOtpByUserId(userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('sendOtp', () => {
    it('should be able to send an otp to a user cellphone', async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce({
        _id: 'user_id',
        cellphone: 'user_cellphone',
      } as UserDocument);

      const sendOtpFunc = jest.spyOn(otpProvider, 'sendOTP');

      await expect(otpService.sendOtp('user_cellphone')).resolves.not.toThrow();
      expect(sendOtpFunc).toHaveBeenCalled();
    });

    it('should not be able to send an otp to a non existent user', async () => {
      jest
        .spyOn(usersService, 'findByCellphone')
        .mockRejectedValueOnce(new NotFoundException('User not found'));

      await expect(otpService.sendOtp('user_cellphone')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findOtpByUserId', () => {
    it('should be able to find an otp by user id', async () => {
      const userId = 'user_id';
      const createdOtp = await otpService.create(userId);

      const foundOtp = await otpService.findOtpByUserId(userId);
      expect(foundOtp).toBe(createdOtp);
    });

    it("should not be able to find an otp by user id there isn't any otps for that user", async () => {
      await expect(
        otpService.findOtpByUserId('user_id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
