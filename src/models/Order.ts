import { BaseEntity, Column, Entity } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'integer', nullable: false })
  id: number;

  @Column({ type: 'integer', nullable: true })
  petId: number;

  @Column({ type: 'integer', nullable: true })
  quantity: number;

  @Column({ type: 'string', nullable: true })
  shipDate: string;

  @Column({ type: 'string', nullable: true })
  status: string;

  @Column({ type: 'boolean', nullable: true })
  complete: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Order;
  }

  constructor(obj?: any) {
    super();
    const props = ['id', 'userName', 'address'];
    const newOrder = _.pick(obj, props);
    this.deserialize(newOrder);
  }
}
