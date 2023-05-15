import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Product } from '../product/product.entity';
import { UserLogin } from '../user-login/user-login.entity';
import { Tower } from '../tower/tower.entity';
import { Discount } from 'src/discount/discount.entity';
import { CartDetail } from 'src/cart-detail/cart-detail.entity';
import { OrderDetail } from 'src/order-detail/order-detail.entity';
import { UserCustomer } from 'src/user-customer/user-customer.entity';
import { Order } from 'src/order/order.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        dialectOptions: {
          ssl: 'Amazon RDS',
        },
      });

      //Add models
      sequelize.addModels([
        Discount,
        Product,
        UserCustomer,
        CartDetail,
        Tower,
        OrderDetail,
        UserLogin,
        Order,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
