import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProficiencyLevel } from '@digvos/database';

export class UpdateCompetencyDto {
  @ApiProperty({
    description: 'ID của sinh viên cần cập nhật năng lực',
    example: 'student-cuid-123',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'ID của năng lực cụ thể thuộc khung DigComp 3.0',
    example: 'comp-cuid-1.1',
  })
  @IsString()
  @IsNotEmpty()
  competencyId: string;

  @ApiProperty({
    description: 'Mức độ thành thạo mới (từ FOUNDATION_1 đến HIGHLY_SPECIALIZED_8)',
    enum: ProficiencyLevel,
    example: ProficiencyLevel.ADVANCED_5,
  })
  @IsEnum(ProficiencyLevel)
  @IsNotEmpty()
  level: ProficiencyLevel;
}
