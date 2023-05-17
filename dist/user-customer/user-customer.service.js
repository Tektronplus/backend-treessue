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
exports.UserCustomerService = void 0;
const common_1 = require("@nestjs/common");
let UserCustomerService = class UserCustomerService {
    constructor(userCustomerRepository) {
        this.userCustomerRepository = userCustomerRepository;
    }
    async findAll() {
        return this.userCustomerRepository.findAll();
    }
    async createUser(user) {
        console.log({ user });
        try {
            const newUserCustomer = await this.userCustomerRepository.create({
                first_name: user.first_name,
                last_name: user.last_name,
                birth_date: user.birth_date,
                phone_number: user.phone_number,
                email: user.email,
                country: user.country,
                province: user.province,
                city: user.city,
                zip_code: user.zip_code,
                address: user.address,
            });
            return newUserCustomer;
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
UserCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_CUSTOMER_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], UserCustomerService);
exports.UserCustomerService = UserCustomerService;
//# sourceMappingURL=user-customer.service.js.map