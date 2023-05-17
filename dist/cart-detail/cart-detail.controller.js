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
exports.CartDetailController = void 0;
const common_1 = require("@nestjs/common");
const cart_detail_service_1 = require("./cart-detail.service");
const apikey_auth_guard_1 = require("../auth/guard/apikey-auth.guard");
let CartDetailController = class CartDetailController {
    constructor(cartDetailService) {
        this.cartDetailService = cartDetailService;
    }
    async getHello() {
        return 'Hello from Cart Detail!';
    }
    async getListCartDetail() {
        return this.cartDetailService.findAll();
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartDetailController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartDetailController.prototype, "getListCartDetail", null);
CartDetailController = __decorate([
    (0, common_1.UseGuards)(apikey_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('cart-detail'),
    __metadata("design:paramtypes", [cart_detail_service_1.CartDetailService])
], CartDetailController);
exports.CartDetailController = CartDetailController;
//# sourceMappingURL=cart-detail.controller.js.map