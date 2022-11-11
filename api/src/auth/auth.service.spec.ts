import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';
import { OtpDocument } from '../otp/schemas/otp.schema';

const user = {
  _id: 'user_id',
  name: 'user_name',
  cellphone: 'user_cellphone',
  eula: true,
} as UserDocument;

describe('AuthService', () => {
  let authService: AuthService;
  let otpService: OtpService;
  let usersService: UsersService;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: OtpService,
          useValue: {
            findOtpByUserId: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByCellphone: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(10),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    otpService = module.get<OtpService>(OtpService);
    usersService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(otpService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(configService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if cellphone and password are valid', async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce(user);

      jest.spyOn(otpService, 'findOtpByUserId').mockResolvedValueOnce({
        password: '1234',
        createdAt: new Date(),
      } as OtpDocument);

      const result = await authService.validateUser('user_cellphone', '1234');

      expect(result).toEqual(user);
    });

    it('should throw an UnauthorizedException if there is no user with the informed cellphone', async () => {
      jest
        .spyOn(usersService, 'findByCellphone')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        authService.validateUser('user_cellphone', '1234'),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if there is no otp was sent to the user', async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce(user);

      jest
        .spyOn(otpService, 'findOtpByUserId')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        authService.validateUser('user_cellphone', '1234'),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should return null if the otp was created more than 10 minutes ago', async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce(user);

      const otpDate = new Date();
      jest.spyOn(otpService, 'findOtpByUserId').mockResolvedValueOnce({
        password: '1234',
        createdAt: otpDate,
      } as OtpDocument);

      const tenMinutesInMilliseconds = 10 * 60 * 1000;
      jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(otpDate.getTime() + tenMinutesInMilliseconds);

      const result = await authService.validateUser('user_cellphone', '1234');

      expect(result).toEqual(null);
    });

    it("should return null if the informed otp isn't right", async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce(user);

      jest.spyOn(otpService, 'findOtpByUserId').mockResolvedValueOnce({
        password: '1234',
        createdAt: new Date(),
      } as OtpDocument);

      const result = await authService.validateUser(
        'user_cellphone',
        'wrong_password',
      );

      expect(result).toEqual(null);
    });

    it("should delete all user's otps after trying to validade", async () => {
      jest.spyOn(usersService, 'findByCellphone').mockResolvedValueOnce(user);

      jest.spyOn(otpService, 'findOtpByUserId').mockResolvedValueOnce({
        password: '1234',
        createdAt: new Date(),
      } as OtpDocument);

      const deleteFunc = jest.spyOn(otpService, 'delete');

      await authService.validateUser('user_cellphone', '1234');

      expect(deleteFunc).toHaveBeenCalled();
    });

    it('should return null if anything throws', async () => {
      jest
        .spyOn(usersService, 'findByCellphone')
        .mockRejectedValueOnce(new Error());

      const result = await authService.validateUser('user_cellphone', '1234');

      expect(result).toEqual(null);
    });
  });

  describe('login', () => {
    it("should return user and it's token", async () => {
      const result = await authService.login(user);

      expect(result).toEqual({
        token: 'token',
        user,
      });
    });
  });
});
