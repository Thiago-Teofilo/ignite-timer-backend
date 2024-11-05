import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(payload: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: payload,
    });
  }

  async getProfile(userId: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Cycle: true,
      },
    });
  }
}
