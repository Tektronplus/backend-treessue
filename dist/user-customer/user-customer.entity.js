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
exports.UserCustomer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_detail_entity_1 = require("../cart-detail/cart-detail.entity");
const order_entity_1 = require("../order/order.entity");
const tower_entity_1 = require("../tower/tower.entity");
const user_login_entity_1 = require("../user-login/user-login.entity");
let UserCustomer = class UserCustomer extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], UserCustomer.prototype, "id_user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], UserCustomer.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], UserCustomer.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], UserCustomer.prototype, "birth_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserCustomer.prototype, "phone_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], UserCustomer.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserCustomer.prototype, "country", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserCustomer.prototype, "province", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserCustomer.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserCustomer.prototype, "zip_code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserCustomer.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => cart_detail_entity_1.CartDetail),
    __metadata("design:type", cart_detail_entity_1.CartDetail)
], UserCustomer.prototype, "cart_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_login_entity_1.UserLogin),
    __metadata("design:type", user_login_entity_1.UserLogin)
], UserCustomer.prototype, "user_login", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_entity_1.Order),
    __metadata("design:type", Array)
], UserCustomer.prototype, "orders", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tower_entity_1.Tower),
    __metadata("design:type", Array)
], UserCustomer.prototype, "towers", void 0);
UserCustomer = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user_customer', updatedAt: false, createdAt: false })
], UserCustomer);
exports.UserCustomer = UserCustomer;
//# sourceMappingURL=user-customer.entity.js.map