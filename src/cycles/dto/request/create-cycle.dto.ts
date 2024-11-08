import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCycleDto {
  @IsString()
  id: string;

  @IsString()
  task: string;

  @IsNumber()
  minutesAmount: number;

  @IsDate()
  startDate: Date;
}
