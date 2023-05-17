"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDetailModule = void 0;
const common_1 = require("@nestjs/common");
const cart_detail_controller_1 = require("./cart-detail.controller");
const cart_detail_service_1 = require("./cart-detail.service");
const cart_detail_providers_1 = require("./cart-detail.providers");
const database_module_1 = require("../database/database.module");
let CartDetailModule = class CartDetailModule {
};
CartDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [cart_detail_controller_1.CartDetailController],
        providers: [cart_detail_service_1.CartDetailService, ...cart_detail_providers_1.cartDetailProvider],
    })
], CartDetailModule);
exports.CartDetailModule = CartDetailModule;
//# sourceMappingURL=cart-detail.module.js.map