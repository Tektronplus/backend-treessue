import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Headers,
  Res,
  Put,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { UserWorkerLoginService } from './user-worker-login.service';
import { UserWorkerService } from 'src/user-worker/user-worker.service';
import { UserWorkerRoleService } from 'src/user-worker-role/user-worker-role.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Base64 } from 'js-base64';
import * as bcrypt from "bcrypt"
@UseGuards(ApiKeyAuthGuard)
@Controller('user-worker-login')
export class UserWorkerLoginController {
  constructor(
    private readonly userWorkerLoginService: UserWorkerLoginService,
    private userWorkerService: UserWorkerService,
    private roleService:UserWorkerRoleService,
    private authService:AuthService
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Worker!';
  }

  @Get('/all')
  async getListUserWorkerLogin(): Promise<Array<any>> {
    return this.userWorkerLoginService.findAll();
  }

  @Post('/login')
  async login(@Req() req, @Headers() headers, @Res() res) {
    type User = {
      email?: string;
      role?: string;
    };
    console.log({ req });
    const headersData = headers.authorization.split('Basic ')[1];
    console.log({ headersData });
    const data = Base64.decode(headersData);
    console.log({ data });
    try {
      const user: User = await this.userWorkerLoginService.findUserWorkerLogin(
        data.split(':')[0],
        data.split(':')[1],
      );
      //console.log({user})

      const userDetail = await this.userWorkerService.findUserDetail(user);
      let role = await this.roleService.findRoleById(userDetail.id_role) 
      console.log({ userDetail });
      let tokenData = {
        email:user.email,
        first_name:userDetail.first_name,
        last_name:userDetail.last_name,
        role: role.role
      }
      res.status(200).json({
        result: await this.authService.generateUserToken(tokenData),
      });
    } catch (err) {
      console.log({ err });
      res.status(403).json({ result: 'user not found' });
    }
  }

  @Put('/updateCredentials')
  async updateCredentials(@Body() body, @Headers() headers, @Res() res) {
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };

    console.log({ body }, { headers });
    const isTokenValid = await this.authService.validateToken(
      headers.authorization,
    );
    if (isTokenValid) {
      const decodedInfo: decodedToken = await this.authService.dechiperUserToken(headers.authorization);
      console.log({ decodedInfo });
      let saltOrRounds = 10;
      let salt = await bcrypt.genSalt(saltOrRounds);
      let newPassword = await bcrypt.hash(body.newPassword, salt);
      console.log({newPassword})
      try {
        await this.userWorkerLoginService.updateUser(decodedInfo.userDetail,newPassword);
        res.status(200).json({ result: 'succesful request' });
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

}
