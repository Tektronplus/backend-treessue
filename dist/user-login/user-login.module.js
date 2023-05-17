"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginModule = void 0;
const common_1 = require("@nestjs/common");
const user_login_controller_1 = require("./user-login.controller");
const user_login_service_1 = require("./user-login.service");
const user_login_providers_1 = require("./user-login.providers");
const database_module_1 = require("../database/database.module");
const auth_module_1 = require("../auth/auth.module");
const user_worker_module_1 = require("../user_worker/user_worker.module");
const user_customer_module_1 = require("../user-customer/user-customer.module");
let UserLoginModule = class UserLoginModule {
};
UserLoginModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule, user_customer_module_1.UserCustomerModule, user_worker_module_1.UserWorkerModule],
        controllers: [user_login_controller_1.UserLoginController, user_login_controller_1.UserRegisterController],
        providers: [user_login_service_1.UserLoginService, ...user_login_providers_1.userLoginProvider],
        exports: [user_login_service_1.UserLoginService],
    })
], UserLoginModule);
exports.UserLoginModule = UserLoginModule;
//# sourceMappingURL=user-login.module.js.map