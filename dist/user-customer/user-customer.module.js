"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCustomerModule = void 0;
const common_1 = require("@nestjs/common");
const user_customer_controller_1 = require("./user-customer.controller");
const user_customer_service_1 = require("./user-customer.service");
const user_customer_providers_1 = require("./user-customer.providers");
const database_module_1 = require("../database/database.module");
let UserCustomerModule = class UserCustomerModule {
};
UserCustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [user_customer_controller_1.UserCustomerController],
        providers: [user_customer_service_1.UserCustomerService, ...user_customer_providers_1.userCustomerProvider],
        exports: [user_customer_service_1.UserCustomerService]
    })
], UserCustomerModule);
exports.UserCustomerModule = UserCustomerModule;
//# sourceMappingURL=user-customer.module.js.map