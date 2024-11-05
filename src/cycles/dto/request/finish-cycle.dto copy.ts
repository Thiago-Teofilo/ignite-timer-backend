import { IsDate, IsOptional, IsString } from 'class-validator';

export class FinishCycleDto {
  @IsDate()
  @IsOptional()
  finishedDate?: Date;

  @IsString()
  userId: string;

  @IsString()
  cycleId: string;
}
