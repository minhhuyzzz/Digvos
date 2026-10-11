import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAnswerDto {
  @ApiProperty({ example: 'q-1' })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  chosenOptionIndex: number;
}
