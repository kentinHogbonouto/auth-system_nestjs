import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register(null), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [UserModule],
})
export class AuthModule {}
