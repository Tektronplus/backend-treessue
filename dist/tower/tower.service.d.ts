import { Tower } from './tower.entity';
export declare class TowerService {
    private towerRepository;
    constructor(towerRepository: typeof Tower);
    findAll(): Promise<Tower[]>;
}
