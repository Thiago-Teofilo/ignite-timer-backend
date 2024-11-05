import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/request/register.dto';
import { LoginUserDto } from './dto/request/login.dto';
import { Public } from 'src/_core/utils/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.logIn(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
