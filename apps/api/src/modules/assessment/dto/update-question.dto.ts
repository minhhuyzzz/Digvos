import { IsString, IsOptional, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProficiencyLevel } from '@digvos/database';

class QuestionOptionsDto {
  @ApiPropertyOptional({ type: [String], example: ['Choice A', 'Choice B', 'Choice C', 'Choice D'] })
  @IsOptional()
  choices?: string[];

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  correctAnswerIndex?: number;
}

export class UpdateQuestionDto {
  @ApiPropertyOptional({ enum: ProficiencyLevel, example: ProficiencyLevel.FOUNDATION_1 })
  @IsOptional()
  @IsEnum(ProficiencyLevel)
  level?: ProficiencyLevel;

  @ApiPropertyOptional({ example: 'Để tìm kiếm thông tin trên internet, công cụ nào sau đây là phù hợp nhất?' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ type: QuestionOptionsDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => QuestionOptionsDto)
  options?: QuestionOptionsDto;
}
