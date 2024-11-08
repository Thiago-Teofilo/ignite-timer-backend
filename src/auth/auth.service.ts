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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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
        username: user.name,
      }),
      user: await this.getProfile(user.id),
    };
  }

  async authenticate(payload: LoginUserDto) {
    const { passwordHash, ...user } = await this.usersService.findOneByEmail(
      payload.email,
    );

    if (!user) {
      throw new BadRequestException('INVALID_CREDENTIALS');
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      passwordHash,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('INVALID_CREDENTIALS');
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.name,
      }),
      user: await this.getProfile(user.id),
    };
  }

  async getProfile(userId: string) {
    return await this.usersService.getProfile(userId);
  }
}
