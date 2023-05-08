import { Sequelize } from 'sequelize-typescript';
import { userCustomer } from 'src/userCustomer/userCustomer.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
        models: [userCustomer]
      });
      //sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
