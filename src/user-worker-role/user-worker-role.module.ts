import { Module } from '@nestjs/common';
import { UserWorkerRoleController } from './user-worker-role.controller';
import { UserWorkerRoleService } from './user-worker-role.service';
import { userWorkerRoleProvider } from './user-worker-role.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserWorkerRoleController],
  providers: [UserWorkerRoleService, ...userWorkerRoleProvider],
  exports: [UserWorkerRoleService],
})
export class UserWorkerRoleModule {}
