import { BaseEntity, Column, Entity } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'integer', nullable: false })
  id: number;

  @Column({ type: 'string', nullable: true })
  username: string;

  @Column({ type: 'string', nullable: true })
  firstName: string;

  @Column({ type: 'string', nullable: true })
  lastName: string;

  @Column({ type: 'string', nullable: true })
  email: string;

  @Column({ type: 'string', nullable: true })
  password: number;

  @Column({ type: 'string', nullable: true })
  phone: number;

  @Column({ type: 'integer', nullable: true })
  userStatus: number;

  deserialize(obj: any) {
    Object.assign(this, obj);
    return this as User;
  }
  constructor(obj: any) {
    super();
    const props = ['id', 'username', 'firstName', 'lastName', 'email', 'password', 'phone', 'userStatus'];
    const newUser = _.pick(obj, props);
    this.deserialize(newUser);
  }
}
