import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("/Users")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post("/register")
  registerNewUser(@Body() body ): string {
    let user = body
    console.log("user in register controller: ",{user})
    return this.appService.createNewUser(user);
  }
}
