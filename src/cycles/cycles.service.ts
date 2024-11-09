import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CyclesService {
  constructor(private prismaService: PrismaService) {}

  async createCycle(payload: Prisma.CycleUncheckedCreateInput) {
    if (payload.minutesAmount % 5 !== 0 || payload.minutesAmount > 60) {
      throw new BadRequestException('INVALID_MINUTES_AMOUNT');
    }

    return await this.prismaService.cycle.create({
      data: payload,
    });
  }

  async interruptCycle(payload: {
    interruptedDate?: Date;
    userId: string;
    cycleId: string;
  }) {
    const cycle = await this.prismaService.cycle.findUnique({
      where: {
        id: payload.cycleId,
        userId: payload.userId,
      },
    });

    if (!cycle) {
      throw new NotFoundException('CYCLE_NOT_FOUND');
    }

    return await this.prismaService.cycle.update({
      where: cycle,
      data: {
        interruptedDate: payload.interruptedDate ?? new Date(),
      },
    });
  }

  async finishCycle(payload: {
    finishedDate?: Date;
    userId: string;
    cycleId: string;
  }) {
    const cycle = await this.prismaService.cycle.findUnique({
      where: {
        id: payload.cycleId,
        userId: payload.userId,
      },
    });

    if (!cycle) {
      throw new NotFoundException('CYCLE_NOT_FOUND');
    }

    return await this.prismaService.cycle.update({
      where: cycle,
      data: {
        finishedDate: payload.finishedDate ?? new Date(),
      },
    });
  }

  async deleteCycle(payload: { userId: string; cycleId: string }) {
    const cycle = await this.prismaService.cycle.findUnique({
      where: {
        id: payload.cycleId,
        userId: payload.userId,
      },
    });

    if (!cycle) {
      throw new NotFoundException('CYCLE_NOT_FOUND');
    }

    return await this.prismaService.cycle.delete({
      where: cycle,
    });
  }
}
