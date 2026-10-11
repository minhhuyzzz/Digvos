import { Module } from '@nestjs/common';
import { ClassroomController } from './presentation/controllers/classroom.controller';
import { ClassroomService } from './application/services/classroom.service';
import { PrismaClassroomRepository } from './infrastructure/repositories/prisma-classroom.repository';

@Module({
  controllers: [ClassroomController],
  providers: [
    ClassroomService,
    {
      provide: 'IClassroomRepository',
      useClass: PrismaClassroomRepository,
    },
  ],
  exports: [ClassroomService],
})
export class WorkspaceModule {}
