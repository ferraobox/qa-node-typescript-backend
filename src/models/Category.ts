import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'integer', nullable: false })
  id: number;

  @Column({ type: 'string', nullable: true })
  name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Category;
  }
  constructor(obj: any) {
    super();
    const props = ['id', 'name'];
    const newCategory = _.pick(obj, props);
    this.deserialize(newCategory);
  }
}
