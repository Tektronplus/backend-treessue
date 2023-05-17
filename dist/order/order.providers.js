"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProvider = void 0;
const order_entity_1 = require("./order.entity");
exports.OrderProvider = [
    {
        provide: 'ORDER_REPOSITORY',
        useValue: order_entity_1.Order,
    },
];
//# sourceMappingURL=order.providers.js.map