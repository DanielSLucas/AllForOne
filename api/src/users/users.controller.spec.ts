import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const users: UserDocument[] = [
  {
    _id: '633b60a7f656f3163bb55907',
    name: 'User 1',
    cellphone: '12912344321',
    eula: true,
  } as UserDocument,
  {
    _id: '633b60e8f656f3163bb55909',
    name: 'User 2',
    cellphone: '12956788765',
    eula: true,
  } as UserDocument,
];

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(users[0]),
            findAll: jest.fn().mockResolvedValue(users),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create an user.', async () => {
      const result = await usersController.create({
        name: 'User 1',
        cellphone: '12912344321',
        eula: true,
      });

      expect(result).toEqual(users[0]);
    });

    it('should not be able to create an user without accepting the EULA.', async () => {
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValueOnce(
          new HttpException('To sign up, EULA must be accepted.', 400),
        );

      expect(
        usersController.create({
          name: 'User 1',
          cellphone: '12912344321',
          eula: false,
        }),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('index', () => {
    it('should be able to list all users.', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(users);
    });
  });
});
