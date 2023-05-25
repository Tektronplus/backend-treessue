import { UserWorkerLogin } from './user-worker-login.entity';

export const userWorkerLoginProvider = [
  {
    provide: 'USER_WORKER_LOGIN_REPOSITORY',
    useValue: UserWorkerLogin,
  },
];
