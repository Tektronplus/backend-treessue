import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Product } from '../product/product.entity';
import { UserLogin } from '../user-login/user-login.entity';
import { Tower } from '../tower/tower.entity';
import { Discount } from '../discount/discount.entity';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { UserCustomer } from '../user-customer/user-customer.entity';
import { Order } from '../order/order.entity';
import { UserWorker } from '../user-worker/user-worker.entity';
import { UserWorkerLogin } from 'src/user-worker-login/user-worker-login.entity';
import { UserWorkerRole } from 'src/user-worker-role/user-worker-role.entity';

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
        UserWorker,
        UserWorkerLogin,
        UserWorkerRole,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
