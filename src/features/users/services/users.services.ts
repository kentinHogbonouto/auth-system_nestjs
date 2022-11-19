import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users.schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(userName: string) {
    return (
      (await this.getUserByName(userName)) ??
      (await this.getUserByEmail(userName))
    );
  }

  getUserByName(name: string) {
    const userName = { $regex: new RegExp(`^${name}$`, 'i') };

    return this.userModel.findOne({ userName });
  }

  getUserByEmail(mail: string) {
    const email = { $regex: new RegExp(`^${mail}$`, 'i') };

    return this.userModel.findOne({ email });
  }

  async create(body: Partial<User>) {
    const user = await this.userModel.create(body);

    user.generateSessionToken();

    return user.save();
  }
}
