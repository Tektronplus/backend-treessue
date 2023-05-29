import {
  Controller,
  Get,
  Headers,
  Res,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { UserCustomerService } from './user-customer.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserLoginService } from 'src/user-login/user-login.service';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-customer')
export class UserCustomerController {
  constructor(
    private readonly userCustomerService: UserCustomerService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Customer!';
  }

  @Get('/all')
  async getListUsersCustomers(): Promise<Array<any>> {
    return this.userCustomerService.findAll();
  }

  @Get('/getUserDetail')
  async getUserDetail(@Headers() headers, @Body() body, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    type decodedToken = {
      userDetail?: { id?: number };
      exp?: number;
      iat?: number;
    };

    console.log({ body }, { headers });
    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      try {
        const detail = { id_user_customer: decodedInfo.userDetail.id };
        const data = await this.userCustomerService.findUserDetail(detail);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }
}
