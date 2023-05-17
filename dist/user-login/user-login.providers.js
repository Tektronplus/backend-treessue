"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginProvider = void 0;
const user_login_entity_1 = require("./user-login.entity");
exports.userLoginProvider = [
    {
        provide: 'USER_LOGIN_REPOSITORY',
        useValue: user_login_entity_1.UserLogin,
    },
];
//# sourceMappingURL=user-login.providers.js.map