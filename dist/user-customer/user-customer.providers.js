"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCustomerProvider = void 0;
const user_customer_entity_1 = require("./user-customer.entity");
exports.userCustomerProvider = [
    {
        provide: 'USER_CUSTOMER_REPOSITORY',
        useValue: user_customer_entity_1.UserCustomer,
    },
];
//# sourceMappingURL=user-customer.providers.js.map