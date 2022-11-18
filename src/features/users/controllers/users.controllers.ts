import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/schemas/users.schemas';
import { UserService } from '../services/users.services';
import { CreateUserDto } from '../interface/dto/create-users.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async register(@Body() body: CreateUserDto) {
    try {
      if (await this.userService.getUserByName(body.username)) {
        throw new BadRequestException('Username already exists');
      }

      if (await this.userService.getUserByEmail(body.email)) {
        throw new BadRequestException('Email already exists');
      }

      const user = await this.userService.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  }
}
