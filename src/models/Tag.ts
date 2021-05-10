import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'integer', nullable: true })
  id: number;

  @Column({ type: 'string', nullable: true })
  name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Tag;
  }
  constructor(obj: any) {
    super();
    const props = ['id', 'name'];
    const newTag = _.pick(obj, props);
    this.deserialize(newTag);
  }
}
