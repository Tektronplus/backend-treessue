"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.towerProvider = void 0;
const tower_entity_1 = require("./tower.entity");
exports.towerProvider = [
    {
        provide: 'TOWER_REPOSITORY',
        useValue: tower_entity_1.Tower,
    },
];
//# sourceMappingURL=tower.providers.js.map