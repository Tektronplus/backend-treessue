import { UserCustomer } from './user-customer.entity';
export declare class UserCustomerService {
    private userCustomerRepository;
    constructor(userCustomerRepository: typeof UserCustomer);
    findAll(): Promise<UserCustomer[]>;
    createUser(user: any): Promise<any>;
}
