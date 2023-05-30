import {
    Controller,
    UseGuards,
    Headers,
    Res,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';

  
  import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
  import { AuthService } from '../auth/auth.service';
  
  import { UserLoginService } from '../user-login/user-login.service';
  import { UserCustomerService } from '../user-customer/user-customer.service';

  @UseGuards(ApiKeyAuthGuard)
  @Controller('backOfficeLogin')
  export class BackOfficeUserLoginController {
    constructor(

      private userLoginService: UserLoginService,
      private userCustomerService: UserCustomerService,
      private authService: AuthService,

    ) {}

    @Put('/modifyUserCustomerDetail/:id')
    async modifyUserInfo(@Headers() headers, @Body() body, @Param() param, @Res() res) {
      console.log({ body }, { headers });
  
  
      if(headers.authorization == undefined)
      {
        res.status(404).json({ result: 'bad request' });
        return
      }
      if(headers.authorization.substring(0,7) != "Bearer ")
      {
        res.status(401).json({ result: 'not authorized' });
        return
      }
  
      let token = headers.authorization.split('Bearer ')[1];
      console.log({ token });
      const isTokenValid = await this.authService.validateToken(token);
      if (isTokenValid) {
        const decodedInfo = await this.authService.dechiperUserToken(token);
        console.log({ decodedInfo });
        if (decodedInfo.userDetail.role == 'ufficio' || decodedInfo.userDetail.role == "admin") {
          const userLoginData = await this.userLoginService.findUserById(param.id)
          const existingRecord = await this.userCustomerService.findOneById(
            userLoginData.dataValues.id_user_customer,
          );
          console.log({ existingRecord });
          let existingValue = {
            id: existingRecord.dataValues.id_user_customer,
            first_name: existingRecord.dataValues.first_name,
            last_name: existingRecord.dataValues.last_name,
            birth_date: existingRecord.dataValues.birth_date,
            phone_number: existingRecord.dataValues.phone_number,
            country: existingRecord.dataValues.country,
            province: existingRecord.dataValues.province,
            city: existingRecord.dataValues.city,
            zip_code: existingRecord.dataValues.zip_code,
            address: existingRecord.dataValues.address,
            email:userLoginData.email
          }; 
          try {
            await this.userLoginService.updateUserEmail(existingValue,body.email)
            await this.userCustomerService.updateDetail(existingValue, body);
            res.status(200).json({ result: 'successful' });
            return
          } catch (err) {
            if ((err = 'ER_DUP_ENTRY'))
            {
              res.status(422).json({ result: 'duplicate entity, verify one or more of your information are correct' });
              return
            }
            else
            {
              res.status(500).json({ result: 'internal server error' });
              return
            } 
          }
        } else {
          res.status(403).json({ result: 'not authorized' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    }
  

    @Delete('/deleteUser/:id')
    async deleteUser(@Param() param, @Headers() headers, @Res() res) 
    {
        if (headers.authorization == undefined) 
        {
            res.status(404).json({ result: 'bad request' });
            return;
        }
        if (headers.authorization.substring(0, 7) != 'Bearer ') 
        {
            res.status(401).json({ result: 'not authorized' });
            return;
        }
  
        let token = headers.authorization.split('Bearer ')[1];
        console.log({ token });
        const isTokenValid = await this.authService.validateToken(token);
        if (isTokenValid) 
        {
            const decodedInfo = await this.authService.dechiperUserToken(token);
            console.log({ decodedInfo });
            if (decodedInfo.userDetail.role == 'admin' || decodedInfo.userDetail.role == "ufficio")
            {
                try
                {
                    let userInfo = await this.userLoginService.findUserById(param.id)
                    await this.userLoginService.deleteUser(userInfo.dataValues)
                }
                catch (err) 
                {
                    console.log({ err });
                    res.status(500).json({ result: 'internal server error' });
                    return;
                }

                
            }
            else
            {
                res.status(403).json({ result: 'not authorized' });
            }
    
        }
        else
        {
            res.status(401).json({ result: 'not authorized' });
        }
    }
}
  