"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountProvider = void 0;
const discount_entity_1 = require("./discount.entity");
exports.discountProvider = [
    {
        provide: 'DISCOUNT_REPOSITORY',
        useValue: discount_entity_1.Discount,
    },
];
//# sourceMappingURL=discount.providers.js.map