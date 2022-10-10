import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User, UserDocument } from './schemas/user.schema';
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

describe('UsersService', () => {
  let usersService: UsersService;
  let usersModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockResolvedValue(users),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersModel).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with name, cellphone and eula.', async () => {
      jest.spyOn(usersModel, 'create').mockResolvedValueOnce(users[0] as never);

      const result = await usersService.create({
        name: 'User 1',
        cellphone: '12912344321',
        eula: true,
      });

      expect(result).toEqual(users[0]);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('cellphone');
      expect(result).toHaveProperty('eula');
    });

    it('should not be able to create an user without accepting the EULA.', async () => {
      const createFunc = jest.spyOn(usersModel, 'create');

      expect(
        usersService.create({
          name: 'User 1',
          cellphone: '12912344321',
          eula: false,
        }),
      ).rejects.toBeInstanceOf(HttpException);
      expect(createFunc).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of users.', async () => {
      const result = await usersService.findAll();

      expect(result).toEqual(users);
    });
  });
});
