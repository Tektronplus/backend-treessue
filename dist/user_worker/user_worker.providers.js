"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorkerProvider = void 0;
const user_worker_entity_1 = require("./user_worker.entity");
exports.userWorkerProvider = [
    {
        provide: 'USER_WORKER_REPOSITORY',
        useValue: user_worker_entity_1.UserWorker,
    },
];
//# sourceMappingURL=user_worker.providers.js.map