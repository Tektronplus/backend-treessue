import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './UserLogin&Reg/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserLoginModule } from './user-login/user-login.module';
import { OrderModule } from './order/order.module';
import { UserWorkerModule } from './user_worker/user_worker.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // To use dot env globally
    UserModule,
    ProductModule,
    AuthModule,
    UserLoginModule,
    OrderModule,
    UserWorkerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
