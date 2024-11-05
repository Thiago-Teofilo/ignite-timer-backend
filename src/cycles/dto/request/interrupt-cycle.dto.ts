import { IsDate, IsOptional, IsString } from 'class-validator';

export class InterruptCycleDto {
  @IsDate()
  @IsOptional()
  interruptedDate?: Date;

  @IsString()
  userId: string;

  @IsString()
  cycleId: string;
}
