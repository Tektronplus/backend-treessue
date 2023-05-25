import { UserWorker } from './user-worker.entity';

export const userWorkerProvider = [
  {
    provide: 'USER_WORKER_REPOSITORY',
    useValue: UserWorker,
  },
];
