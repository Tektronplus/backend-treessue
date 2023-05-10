import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserLoginModule } from './user-login/user-login.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // To use dot env globally
    UserModule,
    ProductModule,
    AuthModule,
    UserLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
