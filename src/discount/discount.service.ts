import { Injectable, Inject } from '@nestjs/common';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @Inject('DISCOUNT_REPOSITORY')
    private discountRepository: typeof Discount,
  ) {}

  async findAll(): Promise<Discount[]> {
    return this.discountRepository.findAll();
  }
}
