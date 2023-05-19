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
    console.log("SECRET: ",this.configService.get<string>('JWT_SECRET'))
    return {
      access_token: await this.jwtService.signAsync({userDetail:user},{secret:await this.configService.get<string>('JWT_SECRET')}),
    };
  }

  async dechiperUserToken(token:string): Promise<any> {
    console.log({ token })
    return await this.jwtService.decode(token)
  }

  async validateToken(token:string): Promise<any>{
    console.log("token in verify: ",token)
    let isTokenValid = await this.jwtService.verifyAsync(token)
    console.log("is token valid auth: ",{isTokenValid})
    return true
  }
}
