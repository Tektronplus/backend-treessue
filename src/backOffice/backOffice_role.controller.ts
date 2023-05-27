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
    Param,
  } from '@nestjs/common';
  
  import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
  import { AuthService } from '../auth/auth.service';
  
  import { UserWorkerRoleService } from '../user-worker-role/user-worker-role.service';
  @UseGuards(ApiKeyAuthGuard)
  @Controller('backOfficeRole')
  export class BackOfficRoleController {
    constructor(

      private authService: AuthService,
      private workerRoleService: UserWorkerRoleService,
    ) {}
  
    @Get('getAllRole')
    async getRoleList(@Headers() headers, @Res() res) {
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
      //console.log({isTokenValid})
      if (isTokenValid) {
        const dechiperAuth = await this.authService.dechiperUserToken(token);
        console.log({ dechiperAuth });
        if (dechiperAuth.userDetail.role == 'admin') {
          try {
            let roleList = await this.workerRoleService.getListRole();
            res.status(200).json(roleList);
            return
          } catch (err) {
            res.status(500).json({ result: 'internal server error' });
            return
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
  
    @Post('newRole')
    async addRole(@Headers() headers, @Body() body, @Res() res) {
  
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
        const dechiperAuth = await this.authService.dechiperUserToken(token);
        //console.log({dechiperAuth})
        if (dechiperAuth.userDetail.role == 'admin') {
          let newRole = body.role;
          let existingRole = await this.workerRoleService.findRoleId(newRole);
          console.log({ existingRole });
          if (existingRole == undefined) {
            try {
              await this.workerRoleService.createRole(body.role);
              res.status(201).json({ result: 'role created successufuly' });
              return
            } catch (err) {
              res.status(500).json({ result: 'internal server error' });
              return
            }
          } else {
            res.status(409).json({ result: 'role exist already' });
            return
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
}