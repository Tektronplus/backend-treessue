import { UserLogin } from './user-login.entity';

export const userLoginProvider = [
  {
    provide: 'USER_LOGIN_REPOSITORY',
    useValue: UserLogin,
  },
];
