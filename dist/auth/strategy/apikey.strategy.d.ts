import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private authService;
    constructor(authService: AuthService);
}
export {};
