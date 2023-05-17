"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_controller_1 = require("./app.controller");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const user_login_module_1 = require("./user-login/user-login.module");
const order_module_1 = require("./order/order.module");
const tower_module_1 = require("./tower/tower.module");
const discount_module_1 = require("./discount/discount.module");
const cart_detail_module_1 = require("./cart-detail/cart-detail.module");
const order_detail_module_1 = require("./order-detail/order-detail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            product_module_1.ProductModule,
            auth_module_1.AuthModule,
            user_login_module_1.UserLoginModule,
            order_module_1.OrderModule,
            tower_module_1.TowerModule,
            discount_module_1.DiscountModule,
            cart_detail_module_1.CartDetailModule,
            order_detail_module_1.OrderDetailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map