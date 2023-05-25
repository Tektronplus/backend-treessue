import { UserWorkerRole } from './user-worker-role.entity';

export const userWorkerRoleProvider = [
  {
    provide: 'USER_WORKER_ROLE_REPOSITORY',
    useValue: UserWorkerRole,
  },
];
