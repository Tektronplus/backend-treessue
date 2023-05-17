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
exports.DiscountController = void 0;
const common_1 = require("@nestjs/common");
const discount_service_1 = require("./discount.service");
const apikey_auth_guard_1 = require("../auth/guard/apikey-auth.guard");
let DiscountController = class DiscountController {
    constructor(discountService) {
        this.discountService = discountService;
    }
    async getHello() {
        return 'Hello from Discount!';
    }
    async getListDiscount() {
        return this.discountService.findAll();
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "getListDiscount", null);
DiscountController = __decorate([
    (0, common_1.UseGuards)(apikey_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('discount'),
    __metadata("design:paramtypes", [discount_service_1.DiscountService])
], DiscountController);
exports.DiscountController = DiscountController;
//# sourceMappingURL=discount.controller.js.map