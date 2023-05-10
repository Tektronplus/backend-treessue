import { Sequelize } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { UserCustomer } from 'src/user-customer/user-customer.entity';
import { ConfigService } from '@nestjs/config';

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
          ssl: {
            rejectUnauthorized: true,
          },
        },
      });

      //Add models
      sequelize.addModels([Product]);
      //sequelize.addModels([UserCustomer]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
