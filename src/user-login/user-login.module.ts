import { Module } from '@nestjs/common';
import { UserLoginController } from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { userLoginProvider } from './user-login.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule,AuthModule],
  controllers: [UserLoginController],
  providers: [UserLoginService, ...userLoginProvider],
  exports:[UserLoginService]
})
export class UserLoginModule {}
