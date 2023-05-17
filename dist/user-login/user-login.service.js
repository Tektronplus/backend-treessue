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
exports.UserLoginService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UserLoginService = class UserLoginService {
    constructor(userLoginRepository) {
        this.userLoginRepository = userLoginRepository;
    }
    async findAll() {
        return this.userLoginRepository.findAll();
    }
    async findUser(username, password) {
        console.log({ username }, { password });
        let userList = await this.userLoginRepository.findAll();
        let user = await userList.find((user) => {
            if (bcrypt.compare(password, user.dataValues.password) && user.dataValues.username == username) {
                return user;
            }
        });
        if (user != null) {
            return user.dataValues;
        }
        else {
            throw new Error("no user found");
        }
    }
    async createUser(user) {
        console.log({ user });
        try {
            const newUserCustomer = await this.userLoginRepository.create({
                id_user_customer: user.userCustomer,
                username: user.username,
                password: user.password,
                role: user.role
            });
            return newUserCustomer;
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
UserLoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_LOGIN_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], UserLoginService);
exports.UserLoginService = UserLoginService;
//# sourceMappingURL=user-login.service.js.map