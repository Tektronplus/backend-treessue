"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDetail = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_entity_1 = require("../product/product.entity");
const user_customer_entity_1 = require("../user-customer/user-customer.entity");
let CartDetail = class CartDetail extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], CartDetail.prototype, "id_cart_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_customer_entity_1.UserCustomer),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], CartDetail.prototype, "id_user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_customer_entity_1.UserCustomer),
    __metadata("design:type", user_customer_entity_1.UserCustomer)
], CartDetail.prototype, "user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_entity_1.Product),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], CartDetail.prototype, "id_product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], CartDetail.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], CartDetail.prototype, "quantity", void 0);
CartDetail = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'cart_detail', updatedAt: false, createdAt: false })
], CartDetail);
exports.CartDetail = CartDetail;
//# sourceMappingURL=cart-detail.entity.js.map