import { UserLoginService } from './user-login.service';
import { AuthService } from "../auth/auth.service";
import { UserCustomerService } from '../user-customer/user-customer.service';
import { UserWorkerService } from '../user_worker/user_worker.service';
export declare class UserLoginController {
    private readonly userLoginService;
    private authService;
    constructor(userLoginService: UserLoginService, authService: AuthService);
    getHello(): Promise<string>;
    getListUsers(): Promise<Array<any>>;
    login(req: any): Promise<{
        access_token: string;
    } | {
        error: any;
    }>;
}
export declare class UserRegisterController {
    private readonly userCustomerService;
    private userWorker;
    private userLoginService;
    constructor(userCustomerService: UserCustomerService, userWorker: UserWorkerService, userLoginService: UserLoginService);
    registerUser(req: any): Promise<"utente creato con successo" | {
        error: any;
    }>;
}
