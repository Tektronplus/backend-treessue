import { TowerService } from './tower.service';
export declare class TowerController {
    private readonly towerService;
    constructor(towerService: TowerService);
    getHello(): Promise<string>;
    getListTower(): Promise<Array<any>>;
}
