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
exports.UserCustomerController = void 0;
const common_1 = require("@nestjs/common");
const user_customer_service_1 = require("./user-customer.service");
let UserCustomerController = class UserCustomerController {
    constructor(userCustomerService) {
        this.userCustomerService = userCustomerService;
    }
    async getHello() {
        return 'Hello from User Customer!';
    }
    async getListUsersCustomers() {
        return this.userCustomerService.findAll();
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserCustomerController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserCustomerController.prototype, "getListUsersCustomers", null);
UserCustomerController = __decorate([
    (0, common_1.Controller)('user-customer'),
    __metadata("design:paramtypes", [user_customer_service_1.UserCustomerService])
], UserCustomerController);
exports.UserCustomerController = UserCustomerController;
//# sourceMappingURL=user-customer.controller.js.map