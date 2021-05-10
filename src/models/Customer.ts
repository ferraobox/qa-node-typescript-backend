import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import * as _ from 'lodash';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'integer', nullable: false })
  id: number;

  @Column({ type: 'string', nullable: true })
  userName: string;

  @Column({ type: 'json', nullable: true })
  address: Address;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Customer;
  }
  constructor(obj: any) {
    super();
    const props = ['id', 'userName', 'address'];
    const newCustomer = _.pick(obj, props);
    this.deserialize(newCustomer);
  }
}
