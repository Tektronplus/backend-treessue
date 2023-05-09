import { Module } from '@nestjs/common';
import { UserCustomerController } from './user-customer.controller';
import { UserCustomerService } from './user-customer.service';
import { userCustomerProvider } from './user-customer.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserCustomerController],
  providers: [UserCustomerService, ...userCustomerProvider],
})
export class UserCustomerModule {}
