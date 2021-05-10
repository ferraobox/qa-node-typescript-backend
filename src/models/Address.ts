import { BaseEntity, Column, Entity } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class Address extends BaseEntity {
  @Column({ type: 'string', nullable: false })
  street: string;

  @Column({ type: 'string', nullable: true })
  city: string;

  @Column({ type: 'string', nullable: true })
  state: string;

  @Column({ type: 'string', nullable: true })
  zip: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Address;
  }

  constructor(obj?: any) {
    super();
    const props = ['street', 'city', 'state', 'zip'];
    const newAddress = _.pick(obj, props);
    this.deserialize(newAddress);
  }
}
