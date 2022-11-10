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
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn().mockResolvedValue(users[0]),
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
  });

  describe('update', () => {
    it("should be able to update an user's info", async () => {
      jest.spyOn(usersService, 'update').mockResolvedValueOnce({
        ...users[0],
        name: 'New user name',
      });

      const result = await usersController.update(users[0]._id, {
        name: 'New user name',
        cellphone: users[0].cellphone,
      });

      expect(result.name).toEqual('New user name');
    });
  });

  describe('delete', () => {
    it('should be able to delete an user', async () => {
      const deleteFunction = jest.spyOn(usersService, 'delete');

      await usersController.delete('user id');

      expect(deleteFunction).toHaveBeenCalledWith('user id');
      expect(deleteFunction).not.toThrow();
    });
  });

  describe('findById', () => {
    it('should be able to find a user by its id', async () => {
      const user = await usersController.findById(users[0]._id);

      expect(user).toEqual(users[0]);
    });
  });

  describe('findAll', () => {
    it('should be able to list all users.', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(users);
    });
  });
});
