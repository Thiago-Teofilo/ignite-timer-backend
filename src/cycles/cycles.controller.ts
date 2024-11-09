import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/request/create-cycle.dto';
import { InterruptCycleDto } from './dto/request/interrupt-cycle.dto';
import { FinishCycleDto } from './dto/request/finish-cycle.dto copy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserId } from '../_core/utils/decorators';

@Controller('cycles')
export class CyclesController {
  constructor(private cyclesService: CyclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCycle(@UserId() userId: string, @Body() body: CreateCycleDto) {
    return this.cyclesService.createCycle({
      ...body,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('interrupt')
  async interruptCycle(
    @UserId() userId: string,
    @Body() body: InterruptCycleDto,
  ) {
    return this.cyclesService.interruptCycle({
      ...body,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('finish')
  async finishCycle(@UserId() userId: string, @Body() body: FinishCycleDto) {
    return this.cyclesService.finishCycle({
      ...body,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':cycleId')
  async deleteCycle(
    @UserId() userId: string,
    @Param() params: { cycleId: string },
  ) {
    return this.cyclesService.deleteCycle({
      userId,
      cycleId: params.cycleId,
    });
  }
}
