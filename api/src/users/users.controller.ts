import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDocument> {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }
}
