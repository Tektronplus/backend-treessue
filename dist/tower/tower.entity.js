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
exports.Tower = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_customer_entity_1 = require("../user-customer/user-customer.entity");
let Tower = class Tower extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Tower.prototype, "id_tower", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_customer_entity_1.UserCustomer),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Number)
], Tower.prototype, "id_user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_customer_entity_1.UserCustomer),
    __metadata("design:type", user_customer_entity_1.UserCustomer)
], Tower.prototype, "user_customer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Tower.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tower.prototype, "tissue_quantity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tower.prototype, "tower_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tower.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tower.prototype, "latitude", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tower.prototype, "longitude", void 0);
Tower = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'tower', updatedAt: false, createdAt: false })
], Tower);
exports.Tower = Tower;
//# sourceMappingURL=tower.entity.js.map