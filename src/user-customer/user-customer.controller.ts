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
    type decodedToken = {
      userDetail?: {id?:number};
      exp?: number;
      iat?: number;
    };

    console.log({ body }, { headers });
    let token = headers.authorization.split("Bearer ")[1]
    console.log({token})
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      try {
        let detail = {id_user_customer:decodedInfo.userDetail.id}
        let data = await this.userCustomerService.findUserDetail(detail);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Put('/modifyUserDetail')
  async modifyUserInfo(@Headers() headers, @Body() body, @Res() res) {
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };

    console.log({ body }, { headers });
    let token = headers.authorization.split("Bearer ")[1]
    console.log({token})
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      try {
        await this.userCustomerService.updateDetail(
          decodedInfo.userDetail,
          body,
        );
        res.status(200).json({ result: 'successful' });
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }
}
