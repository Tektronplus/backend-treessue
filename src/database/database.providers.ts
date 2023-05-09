import { Sequelize } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
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
        dialectOptions: {
          ssl: {
            rejectUnauthorized: true,
          },
        },
        username: databaseUsername,
        password: databasePassword,
        database: databaseName,
      });
      sequelize.addModels([Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
