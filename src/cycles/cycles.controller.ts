import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCycleDto } from './dto/request/create-cycle.dto';
import { InterruptCycleDto } from './dto/request/interrupt-cycle.dto';
import { FinishCycleDto } from './dto/request/finish-cycle.dto copy';

@Controller('cycles')
export class CyclesController {
  constructor(private cyclesService: CyclesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCycle(@Request() req, @Body() body: CreateCycleDto) {
    return this.cyclesService.createCycle({
      ...body,
      userId: req.user.sub as string,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('interrupt')
  async interruptCycle(@Request() req, @Body() body: InterruptCycleDto) {
    return this.cyclesService.interruptCycle({
      ...body,
      userId: req.user.sub as string,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('finish')
  async finishCycle(@Request() req, @Body() body: FinishCycleDto) {
    return this.cyclesService.finishCycle({
      ...body,
      userId: req.user.sub as string,
    });
  }
}
