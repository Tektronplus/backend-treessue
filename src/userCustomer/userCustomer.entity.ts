import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class userCustomer extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  birthDate: Date;

  @Column
  phoneNumber: number;

  @Column
  email: string;

  @Column
  country:string;

  @Column
  province:string;

  @Column
  city:string;

  @Column
  zipCode:number;

  @Column
  address:string;
}