import { Module } from '@nestjs/common';
import { UserWorkerLoginController } from './user-worker-login.controller';
import { UserWorkerLoginService } from './user-worker-login.service';
import { DatabaseModule } from '../database/database.module';
import { userWorkerLoginProvider } from './user-worker-login.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserWorkerLoginController],
  providers: [UserWorkerLoginService, ...userWorkerLoginProvider],
  exports: [UserWorkerLoginService],
})
export class UserWorkerLoginModule {}
