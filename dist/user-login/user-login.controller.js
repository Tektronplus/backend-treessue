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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterController = exports.UserLoginController = void 0;
const common_1 = require("@nestjs/common");
const user_login_service_1 = require("./user-login.service");
const apikey_auth_guard_1 = require("../auth/guard/apikey-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const user_customer_service_1 = require("../user-customer/user-customer.service");
const user_worker_service_1 = require("../user_worker/user_worker.service");
const moment_1 = require("moment");
const bcrypt_1 = require("bcrypt");
let UserLoginController = class UserLoginController {
    constructor(userLoginService, authService) {
        this.userLoginService = userLoginService;
        this.authService = authService;
    }
    async getHello() {
        return 'Hello from User Login!';
    }
    async getListUsers() {
        return this.userLoginService.findAll();
    }
    async login(req) {
        try {
            const user = await this.userLoginService.findUser(req.body.username, req.body.password);
            console.log({ user });
            return this.authService.generateUserToken(user);
        }
        catch (err) {
            console.log({ err });
            return { error: err.message };
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserLoginController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserLoginController.prototype, "getListUsers", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserLoginController.prototype, "login", null);
UserLoginController = __decorate([
    (0, common_1.UseGuards)(apikey_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('user-login'),
    __metadata("design:paramtypes", [user_login_service_1.UserLoginService, auth_service_1.AuthService])
], UserLoginController);
exports.UserLoginController = UserLoginController;
let UserRegisterController = class UserRegisterController {
    constructor(userCustomerService, userWorker, userLoginService) {
        this.userCustomerService = userCustomerService;
        this.userWorker = userWorker;
        this.userLoginService = userLoginService;
    }
    async registerUser(req) {
        let newUser = req.body;
        console.log({ newUser });
        const saltOrRounds = 10;
        const salt = await bcrypt_1.default.genSalt(saltOrRounds);
        const hash = await bcrypt_1.default.hash(newUser.password, salt);
        let userLoginEntity = {
            userCustomer: "",
            username: newUser.username,
            password: hash,
            role: "user"
        };
        let userCustomerEntity = {
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            birth_date: (0, moment_1.default)(newUser.birthDate, "DD-MM-YYYY").toDate(),
            phone_number: newUser.phoneNumber,
            email: newUser.email,
            country: newUser.country,
            province: newUser.province,
            city: newUser.city,
            zip_code: newUser.zipCode,
            address: newUser.address
        };
        try {
            let newCreatedUserCustomer = await this.userCustomerService.createUser(userCustomerEntity);
            console.log({ newCreatedUserCustomer });
            userLoginEntity.userCustomer = newCreatedUserCustomer.id_user_customer;
            console.log({ userLoginEntity });
            let newCreatedUserLogin = await this.userLoginService.createUser(userLoginEntity);
            console.log({ newCreatedUserLogin });
            return "utente creato con successo";
        }
        catch (err) {
            console.log(err);
            return { error: err.message };
        }
    }
};
__decorate([
    (0, common_1.Post)("/registerCustomer"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserRegisterController.prototype, "registerUser", null);
UserRegisterController = __decorate([
    (0, common_1.UseGuards)(apikey_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('user-registration'),
    __metadata("design:paramtypes", [user_customer_service_1.UserCustomerService,
        user_worker_service_1.UserWorkerService,
        user_login_service_1.UserLoginService])
], UserRegisterController);
exports.UserRegisterController = UserRegisterController;
//# sourceMappingURL=user-login.controller.js.map