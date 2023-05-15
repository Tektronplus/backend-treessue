import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  validateApiKey(apiKey: string) {
    const apiKeys: string[] = [this.configService.get<string>('API_KEY')];
    return apiKeys.find((key) => apiKey == key);
  }

  async generateUserToken(user: object) {
    console.log({ user });
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
