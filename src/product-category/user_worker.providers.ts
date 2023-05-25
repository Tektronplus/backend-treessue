import { UserWorker } from './user_worker.entity';

export const userWorkerProvider = [
  {
    provide: 'USER_WORKER_REPOSITORY',
    useValue: UserWorker,
  },
];
