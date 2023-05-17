"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailModule = void 0;
const common_1 = require("@nestjs/common");
const order_detail_controller_1 = require("./order-detail.controller");
const order_detail_service_1 = require("./order-detail.service");
const order_detail_providers_1 = require("./order-detail.providers");
const database_module_1 = require("../database/database.module");
let OrderDetailModule = class OrderDetailModule {
};
OrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [order_detail_controller_1.OrderDetailController],
        providers: [order_detail_service_1.OrderDetailService, ...order_detail_providers_1.orderDetailProvider],
    })
], OrderDetailModule);
exports.OrderDetailModule = OrderDetailModule;
//# sourceMappingURL=order-detail.module.js.map