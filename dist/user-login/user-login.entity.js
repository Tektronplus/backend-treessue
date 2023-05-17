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
exports.UserLogin = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_customer_entity_1 = require("../user-customer/user-customer.entity");
let UserLogin = class UserLogin extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], UserLogin.prototype, "id_user_login", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_customer_entity_1.UserCustomer),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], UserLogin.prototype, "id_user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_customer_entity_1.UserCustomer),
    __metadata("design:type", user_customer_entity_1.UserCustomer)
], UserLogin.prototype, "user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], UserLogin.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], UserLogin.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], UserLogin.prototype, "role", void 0);
UserLogin = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user_login', updatedAt: false, createdAt: false })
], UserLogin);
exports.UserLogin = UserLogin;
//# sourceMappingURL=user-login.entity.js.map