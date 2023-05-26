import { Module } from '@nestjs/common';
import { UserWorkerLoginController } from './user-worker-login.controller';
import { UserWorkerLoginService } from './user-worker-login.service';
import { DatabaseModule } from '../database/database.module';
import { userWorkerLoginProvider } from './user-worker-login.providers';
import { UserWorkerModule } from '../user-worker/user-worker.module';
import { UserWorkerRoleModule } from '../user-worker-role/user-worker-role.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [DatabaseModule, UserWorkerModule, AuthModule, UserWorkerRoleModule],
  controllers: [UserWorkerLoginController],
  providers: [UserWorkerLoginService, ...userWorkerLoginProvider],
  exports: [UserWorkerLoginService],
})
export class UserWorkerLoginModule {}
