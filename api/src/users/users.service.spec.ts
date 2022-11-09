import { Model } from 'mongoose';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { FakeModel } from '../helpers/fakeModel.helper';

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
          useValue: new FakeModel<User>(),
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
      const result = await usersService.create(users[0]);

      expect(result).toEqual(users[0]);
      expect(result).toHaveProperty('_id');
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

    it('should not be able to create two users with the same cellphone number', async () => {
      await usersService.create(users[0]);
      await expect(usersService.create(users[0])).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it("should be able to update user's info", async () => {
      await usersService.create(users[0]);

      const result = await usersService.update(users[0]._id, {
        name: users[0].name,
        cellphone: '12912344322',
      });

      expect(result.cellphone).toEqual('12912344322');
    });

    it("should not be able to update an user's cellphone to a cellphone number that is already in use", async () => {
      await Promise.all(users.map((user) => usersService.create(user)));

      await expect(
        usersService.update(users[0]._id, {
          name: users[0].name,
          cellphone: users[1].cellphone,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should be able to delete an user', async () => {
      await usersService.create(users[0]);

      const usersBeforeDeletion = await usersService.findAll();
      expect(usersBeforeDeletion.length).toBe(1);

      await expect(usersService.delete(users[0]._id)).resolves.not.toThrow();

      const usersAfterDeletion = await usersService.findAll();
      expect(usersAfterDeletion.length).toBe(0);
    });
  });

  describe('findAll', () => {
    it('should return a list of users.', async () => {
      await Promise.all(users.map((user) => usersService.create(user)));

      const result = await usersService.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findById', () => {
    it('should be able to find an user by his id', async () => {
      await Promise.all(users.map((user) => usersService.create(user)));

      const user = await usersService.findById(users[0]._id);

      expect(user).toEqual(users[0]);
    });

    it('should not be able to find an non-existent user', async () => {
      await expect(
        usersService.findById('non-existent user id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findByCellphone', () => {
    it('should be able to find an user by his cellphone number', async () => {
      await Promise.all(users.map((user) => usersService.create(user)));

      const user = await usersService.findByCellphone(users[0].cellphone);

      expect(user).toEqual(users[0]);
    });

    it('should not be able to find an non-existent user', async () => {
      await expect(
        usersService.findByCellphone('non-existent user cellphone'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
