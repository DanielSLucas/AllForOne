import { Model } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    if (!createUserDTO.eula) {
      throw new BadRequestException('To sign up, EULA must be accepted.');
    }

    const userExists = await this.userModel.findOne({
      cellphone: createUserDTO.cellphone,
    });

    if (userExists) {
      throw new BadRequestException(
        'An user with this cellphone already exists',
      );
    }

    return this.userModel.create({
      ...createUserDTO,
      active: true,
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findByCellphone(cellphone: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      cellphone,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
