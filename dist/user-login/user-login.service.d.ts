import { UserLogin } from './user-login.entity';
export declare class UserLoginService {
    private userLoginRepository;
    constructor(userLoginRepository: typeof UserLogin);
    findAll(): Promise<UserLogin[]>;
    findUser(username: any, password: any): Promise<object>;
    createUser(user: any): Promise<any>;
}
