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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_customer_entity_1 = require("../user-customer/user-customer.entity");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
let Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "id_order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_customer_entity_1.UserCustomer),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "id_user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_customer_entity_1.UserCustomer),
    __metadata("design:type", user_customer_entity_1.UserCustomer)
], Order.prototype, "user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Order.prototype, "id_user_worker", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "order_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "order_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Order.prototype, "courier_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "tracking_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Number)
], Order.prototype, "start_shipping_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "expected_delivery_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Number)
], Order.prototype, "delivery_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "original_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_detail_entity_1.OrderDetail),
    __metadata("design:type", Array)
], Order.prototype, "orders_detail", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'order', updatedAt: false, createdAt: false })
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map