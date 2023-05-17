import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    validateApiKey(apiKey: string): string;
    generateUserToken(user: object): Promise<{
        access_token: string;
    }>;
}
