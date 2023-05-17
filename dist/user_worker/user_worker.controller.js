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
exports.UserWorkerController = void 0;
const common_1 = require("@nestjs/common");
const user_worker_service_1 = require("./user_worker.service");
const apikey_auth_guard_1 = require("../auth/guard/apikey-auth.guard");
let UserWorkerController = class UserWorkerController {
    constructor(userWorkerService) {
        this.userWorkerService = userWorkerService;
    }
    async getHello() {
        return 'Hello from User Worker!';
    }
    async getListUsers() {
        return this.userWorkerService.findAll();
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWorkerController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWorkerController.prototype, "getListUsers", null);
UserWorkerController = __decorate([
    (0, common_1.UseGuards)(apikey_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('user-worker'),
    __metadata("design:paramtypes", [user_worker_service_1.UserWorkerService])
], UserWorkerController);
exports.UserWorkerController = UserWorkerController;
//# sourceMappingURL=user_worker.controller.js.map