import { Module } from '@nestjs/common';
import { userCustomerService } from './userCustomer.service';
import { userCustomerProvider } from './userCustomer.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    userCustomerService,
    ...userCustomerProvider,
  ],
})
export class userCustomerModule {}