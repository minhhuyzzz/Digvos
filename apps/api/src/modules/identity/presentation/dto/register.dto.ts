import { IsString, IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LocalRegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(8)
  @IsString()
  password: string;

  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['STUDENT', 'TEACHER', 'EMPLOYER'], example: 'STUDENT' })
  @IsOptional()
  @IsEnum(['STUDENT', 'TEACHER', 'EMPLOYER'])
  role?: 'STUDENT' | 'TEACHER' | 'EMPLOYER';

  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;
}
