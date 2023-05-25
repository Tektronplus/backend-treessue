import { Module } from '@nestjs/common';
import { UserWorkerController } from './user_worker.controller';
import { UserWorkerService } from './user_worker.service';
import { userWorkerProvider } from './user_worker.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserWorkerController],
  providers: [UserWorkerService, ...userWorkerProvider],
  exports:[UserWorkerService]
})
export class UserWorkerModule {}
