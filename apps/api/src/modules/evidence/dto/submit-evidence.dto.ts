import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitEvidenceDto {
  @ApiProperty({
    description: 'ID của sinh viên nộp minh chứng',
    example: 'student-cuid-123',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'ID của năng lực cụ thể mà minh chứng này bảo chứng',
    example: 'comp-cuid-1.1',
  })
  @IsString()
  @IsNotEmpty()
  competencyId: string;

  @ApiProperty({
    description: 'Đường dẫn liên kết tải tệp minh chứng (ảnh, PDF, video, mã nguồn...)',
    example: 'https://supabase.storage.digvos.vn/evidences/student-123-comp-1.1.pdf',
  })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
