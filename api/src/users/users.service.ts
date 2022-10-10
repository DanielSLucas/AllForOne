import { Model } from 'mongoose';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        'To sign up, EULA must be accepted.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userModel.create(createUserDTO);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findByCellphone(cellphone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({
      cellphone,
    });
  }
}
