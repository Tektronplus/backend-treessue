import { Module } from '@nestjs/common';
import { UserCustomerController } from './user-customer.controller';
import { UserCustomerService } from './user-customer.service';
import { userCustomerProvider } from './user-customer.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserCustomerController],
  providers: [UserCustomerService, ...userCustomerProvider],
  exports: [UserCustomerService],
})
export class UserCustomerModule {}
