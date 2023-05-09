import { Sequelize } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { UserCustomer } from 'src/user-customer/user-customer.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseName = process.env.DATABASE_NAME;
const databaseUsername = process.env.DATABASE_USERNAME;
const databaseHost = process.env.DATABASE_HOST;
const databasePassword = process.env.DATABASE_PASSWORD;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: databaseHost,
        username: databaseUsername,
        password: databasePassword,
        database: databaseName,
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
