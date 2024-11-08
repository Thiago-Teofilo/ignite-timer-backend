import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/request/register.dto';
import { LoginUserDto } from './dto/request/login.dto';
import { Public, UserId } from 'src/_core/utils/decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('authenticate')
  async authenticate(@Body() body: LoginUserDto) {
    return this.authService.authenticate(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserId() userId: string) {
    return this.authService.getProfile(userId);
  }
}
