"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("@nestjs/config");
const product_entity_1 = require("../product/product.entity");
const user_login_entity_1 = require("../user-login/user-login.entity");
const tower_entity_1 = require("../tower/tower.entity");
const discount_entity_1 = require("../discount/discount.entity");
const cart_detail_entity_1 = require("../cart-detail/cart-detail.entity");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
const user_customer_entity_1 = require("../user-customer/user-customer.entity");
const order_entity_1 = require("../order/order.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                dialectModule: require('mysql2'),
                host: configService.get('DATABASE_HOST'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                dialectOptions: {
                    ssl: 'Amazon RDS',
                },
            });
            sequelize.addModels([
                discount_entity_1.Discount,
                product_entity_1.Product,
                user_customer_entity_1.UserCustomer,
                cart_detail_entity_1.CartDetail,
                tower_entity_1.Tower,
                order_detail_entity_1.OrderDetail,
                user_login_entity_1.UserLogin,
                order_entity_1.Order,
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map