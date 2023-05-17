import { UserWorker } from './user_worker.entity';
export declare class UserWorkerService {
    private userWorkerRepository;
    constructor(userWorkerRepository: typeof UserWorker);
    findAll(): Promise<UserWorker[]>;
}
