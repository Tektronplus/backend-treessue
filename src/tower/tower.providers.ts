import { Tower } from './tower.entity';

export const towerProvider = [
  {
    provide: 'TOWER_REPOSITORY',
    useValue: Tower,
  },
];
