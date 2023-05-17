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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_detail_entity_1 = require("../cart-detail/cart-detail.entity");
const discount_entity_1 = require("../discount/discount.entity");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "id_product", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => discount_entity_1.Discount),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], Product.prototype, "id_discount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => discount_entity_1.Discount),
    __metadata("design:type", discount_entity_1.Discount)
], Product.prototype, "discount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "prod_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Product.prototype, "unit_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT('long')),
    __metadata("design:type", Object)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Product.prototype, "is_available", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_detail_entity_1.OrderDetail),
    __metadata("design:type", Array)
], Product.prototype, "order_details", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_detail_entity_1.CartDetail),
    __metadata("design:type", Array)
], Product.prototype, "cart_details", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'products', updatedAt: false, createdAt: false })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map