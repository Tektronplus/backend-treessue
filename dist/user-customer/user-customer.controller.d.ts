import { UserCustomerService } from './user-customer.service';
export declare class UserCustomerController {
    private readonly userCustomerService;
    constructor(userCustomerService: UserCustomerService);
    getHello(): Promise<string>;
    getListUsersCustomers(): Promise<Array<any>>;
}
