import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAssessmentDto {
  @ApiProperty({
    description: 'ID của sinh viên thực hiện bài thi',
    example: 'student-cuid-123',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'ID của năng lực cụ thể mà bài thi đánh giá',
    example: 'comp-cuid-1.1',
  })
  @IsString()
  @IsNotEmpty()
  competencyId: string;

  @ApiProperty({
    description: 'Điểm số đạt được từ bài thi (từ 0 đến 100)',
    minimum: 0,
    maximum: 100,
    example: 85,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;
}
