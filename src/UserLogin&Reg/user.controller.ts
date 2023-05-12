import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/Users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post('/register')
  registerNewUser(@Body() body): string {
    const user = body;
    console.log('user in register controller: ', { user });
    return this.appService.createNewUser(user);
  }

  @Post('/login')
  autentichateUser(@Body() body): string {
    const user = body;
    console.log('user in login controller: ', { user });
    return this.appService.loginUser(user);
  }
}
