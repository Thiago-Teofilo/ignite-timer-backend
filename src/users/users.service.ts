/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        name: username,
      },
    });
  }
  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
      include: {
        Cycle: true,
      },
    });

    if (user) {
      const { Cycle, ...userWithoutCycle } = user;

      return {
        ...userWithoutCycle,
        cycles: Cycle,
      };
    }

    return user;
  }

  async create(payload: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: payload,
    });
  }

  async getProfile(userId: string) {
    const { Cycle, passwordHash, ...user } =
      await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          Cycle: true,
        },
      });

    return {
      ...user,
      cycles: Cycle,
    };
  }
}
