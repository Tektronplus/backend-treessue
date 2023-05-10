import { Module } from '@nestjs/common';
import { UserLoginController } from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { userLoginProvider } from './user-login.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserLoginController],
  providers: [UserLoginService, ...userLoginProvider],
})
export class UserLoginModule {}
