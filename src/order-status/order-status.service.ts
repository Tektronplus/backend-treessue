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
}
