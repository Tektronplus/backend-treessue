import { Module } from '@nestjs/common';
import {
  UserLoginController,
  UserRegisterController,
} from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { userLoginProvider } from './user-login.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UserWorkerModule } from '../user_worker/user_worker.module';
import { UserCustomerModule } from '../user-customer/user-customer.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserCustomerModule, UserWorkerModule],
  controllers: [UserLoginController, UserRegisterController],
  providers: [UserLoginService, ...userLoginProvider],
  exports: [UserLoginService],
})
export class UserLoginModule {}
