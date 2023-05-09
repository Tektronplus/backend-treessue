import { Sequelize } from 'sequelize-typescript';
import { Product } from './ProductEntity/product.entity';
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
<<<<<<< HEAD
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
=======
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([userCustomer]);
>>>>>>> e70a2bc27e7416a2d7131786de81db853ef1a2b0
      await sequelize.sync();
      return sequelize;
    },
  },
];
