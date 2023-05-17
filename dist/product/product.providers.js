"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productProvider = void 0;
const product_entity_1 = require("./product.entity");
exports.productProvider = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useValue: product_entity_1.Product,
    },
];
//# sourceMappingURL=product.providers.js.map