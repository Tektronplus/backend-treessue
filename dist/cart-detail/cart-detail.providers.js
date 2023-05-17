"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDetailProvider = void 0;
const cart_detail_entity_1 = require("./cart-detail.entity");
exports.cartDetailProvider = [
    {
        provide: 'CART_DETAIL_REPOSITORY',
        useValue: cart_detail_entity_1.CartDetail,
    },
];
//# sourceMappingURL=cart-detail.providers.js.map