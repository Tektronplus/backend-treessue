"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailProvider = void 0;
const order_detail_entity_1 = require("./order-detail.entity");
exports.orderDetailProvider = [
    {
        provide: 'ORDER_DETAIL_REPOSITORY',
        useValue: order_detail_entity_1.OrderDetail,
    },
];
//# sourceMappingURL=order-detail.providers.js.map