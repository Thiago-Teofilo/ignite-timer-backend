import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JWT_SECRET_KEY } from './_core/utils/constants';
import { CyclesModule } from './cycles/cycles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CyclesModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
