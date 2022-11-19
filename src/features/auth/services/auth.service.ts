import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { environments } from 'src/environments/environments';
import { User } from '../schemas/users.schemas';
import { UserService } from 'src/features/users/services/users.services';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async checkUserName(userName: string, password: string) {
    const user = await this.userService.getUser(userName);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (!(await user.validatePassword(password))) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  async login(user: User): Promise<TokenResponse> {
    const payload = {
      sub: user.id,
      username: user.userName,
    };

    let refreshToken: string;

    if (environments.accessTokenExpiration) {
      refreshToken = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(user),
      );
    }

    return {
      accessToken: await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(user),
      ),
      refreshToken,
    };
  }

  getRefreshTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }

  getAccessTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('access', user);
  }

  private getTokenOptions(type: 'refresh' | 'access', user: User) {
    const options: JwtSignOptions = {
      secret: environments[type + 'TokenSecret'] + user.sessionToken,
    };

    const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
