import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
