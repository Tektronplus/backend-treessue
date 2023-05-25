import { Module } from '@nestjs/common';
import { UserWorkerController } from './user-worker.controller';
import { UserWorkerService } from './user-worker.service';
import { userWorkerProvider } from './user-worker.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserWorkerController],
  providers: [UserWorkerService, ...userWorkerProvider],
  exports: [UserWorkerService],
})
export class UserWorkerModule {}
