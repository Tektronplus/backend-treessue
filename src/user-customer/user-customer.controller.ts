import {
  Controller,
  Get,
  Req,
  Headers,
  Res,
  Delete,
  UseGuards,
  Put,
  Body
} from '@nestjs/common';
import { UserCustomerService } from './user-customer.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { check } from 'prettier';
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

  @Put("/modifyUserInfo")
  async modifyUserInfo(@Headers() headers, @Body() body, @Res() res)
  {
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };

    console.log({body},{headers})
    const isTokenValid = await this.authService.validateToken(
      headers.authorization,
    );
    if(isTokenValid)
    {
      const decodedInfo: decodedToken = await this.authService.dechiperUserToken(headers.authorization);
      console.log({decodedInfo})
      try
      {
        await this.userCustomerService.updateDetail(decodedInfo.userDetail,body)
        res.status(200).json({ result: 'successful' });
      }
      catch(err)
      {
        res.status(500).json({ result: 'internal server error' });
      }

    }
    else
    {
      res.status(403).json({ result: 'not authorized' });
    }
  }
  
}
