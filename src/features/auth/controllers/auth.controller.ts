import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from 'src/features/users/services/users.services';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log('username :', body.userName, 'user password :', body.password);
    return this.authService.login(
      await this.authService.checkUserName(body.userName, body.password),
    );
  }
}
