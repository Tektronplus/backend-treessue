import { UserWorkerService } from './user_worker.service';
export declare class UserWorkerController {
    private readonly userWorkerService;
    constructor(userWorkerService: UserWorkerService);
    getHello(): Promise<string>;
    getListUsers(): Promise<Array<any>>;
}
