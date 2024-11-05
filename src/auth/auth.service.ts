import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/request/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/request/login.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(email: string, pass: string): Promise<any> {
  //     const user = await this.usersService.findOne(username);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  async register(payload: RegisterUserDto) {
    const userWithSameEmail = await this.usersService.findOneByEmail(
      payload.email,
    );

    if (userWithSameEmail) {
      throw new ConflictException('USER_WITH_SAME_EMAIL');
    }

    const user = await this.usersService.create({
      email: payload.email,
      name: payload.name,
      passwordHash: await bcrypt.hash(payload.password, 6),
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async logIn(payload: LoginUserDto) {
    const user: User = await this.usersService.findOneByEmail(payload.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      user.passwordHash,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
