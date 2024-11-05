import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JWT_SECRET_KEY } from 'src/_core/utils/constants';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
