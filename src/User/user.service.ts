import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  createNewUser(user): string {
    console.log({user})
    return 'Hello World!';
  };

  loginUser(user): string
  {
    return "loggin in"
  }
}
