import { IsString, IsNotEmpty, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProficiencyLevel } from '@digvos/database';

class QuestionOptionsDto {
  @ApiProperty({ type: [String], example: ['Choice A', 'Choice B', 'Choice C', 'Choice D'] })
  @IsNotEmpty({ each: true })
  choices: string[];

  @ApiProperty({ example: 1 })
  correctAnswerIndex: number;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'competency-1.1' })
  @IsString()
  @IsNotEmpty()
  competencyId: string;

  @ApiProperty({ enum: ProficiencyLevel, example: ProficiencyLevel.FOUNDATION_1 })
  @IsEnum(ProficiencyLevel)
  level: ProficiencyLevel;

  @ApiProperty({ example: 'Để tìm kiếm thông tin trên internet, công cụ nào sau đây là phù hợp nhất?' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: QuestionOptionsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => QuestionOptionsDto)
  options: QuestionOptionsDto;
}
