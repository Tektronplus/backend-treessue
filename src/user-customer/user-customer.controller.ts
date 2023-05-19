import {
  Controller,
  Get,
  Req,
  Headers,
  Res,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserCustomerService } from './user-customer.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from 'src/auth/auth.service';
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

  @Delete('/delete')
  async deleteUser(@Req() req, @Headers() headers, @Res() res) {
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };
    console.log('============== DELETE REQUEST =================');
    const isTokenValid = await this.authService.validateToken(
      headers.authorization,
    );
    console.log({ isTokenValid });
    const decodedInfo: decodedToken = await this.authService.dechiperUserToken(
      headers.authorization,
    );
    const user = decodedInfo.userDetail;
    //console.log("user in controller: ",{user})
    /*try {
      const result = await this.userCustomerService.DeleteUser(user)
      return result;
    } catch (err) {
      console.log({ err }); 
      return { error: err.message };
    }*/
  }
}
