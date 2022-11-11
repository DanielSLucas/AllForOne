import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it("should return user and it's token", async () => {
      const user = {
        _id: 'user_id',
        name: 'user_name',
        cellphone: 'user_cellphone',
        eula: true,
      } as UserDocument;

      jest.spyOn(authService, 'login').mockResolvedValueOnce({
        token: 'token',
        user,
      });

      const result = await authController.login({ user });

      expect(result).toEqual({
        token: 'token',
        user,
      });
    });
  });
});
