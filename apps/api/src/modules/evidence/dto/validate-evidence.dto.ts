import { IsString, IsNotEmpty, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateEvidenceDto {
  @ApiProperty({
    description: 'ID của bài nộp minh chứng cần chấm duyệt',
    example: 'submission-cuid-789',
  })
  @IsString()
  @IsNotEmpty()
  submissionId: string;

  @ApiProperty({
    description: 'Trạng thái giảng viên duyệt thông qua minh chứng này hay không',
    example: true,
  })
  @IsBoolean()
  isApproved: boolean;

  @ApiProperty({
    description: 'Điểm số đánh giá cho minh chứng này (từ 0 đến 100)',
    minimum: 0,
    maximum: 100,
    example: 80,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @ApiProperty({
    description: 'Phản hồi chi tiết, nhận xét của giảng viên',
    example: 'Bài thuyết trình của bạn rất xuất sắc, phân tích rõ ràng và đưa ra các minh chứng xác thực.',
  })
  @IsString()
  @IsNotEmpty()
  feedback: string;
}
