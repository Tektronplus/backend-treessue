import { Injectable, Inject } from '@nestjs/common';
import { OrderStatus } from './order-status.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OrderStatusService {
  constructor(
    @Inject('ORDER_STATUS_REPOSITORY')
    private orderStatusRepository: typeof OrderStatus,
    private authService: AuthService,
  ) {}

  async getHello(): Promise<any> {
    return 'Hello from Order Status';
  }

  async findStatusId(status): Promise<any> {
    console.log({status})
    try
    {
      let foundStatus = await this.orderStatusRepository.findOne({where: { status: status }});
      console.log({foundStatus})
      if(foundStatus == null)
      {
        return undefined
      }
      else
      {
        return foundStatus
      }
    }
    catch(err)
    {
      throw new Error(err);
    }
    
  }
  
  async findStatusById(id): Promise<any>
  {
    try{
      return await this.orderStatusRepository.findOne({where:{id_order_status:id}})
    }
    catch(err)
    {
      throw new Error(err);
    }
  }
}
