import { BaseEntity, Column, Entity } from 'typeorm';
import { Category } from './Category';
import { Tag } from './Tag';
import * as _ from 'lodash';

@Entity()
export class Pet extends BaseEntity {
  @Column({ type: 'integer', nullable: true })
  id: number;

  @Column({ type: 'string', nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  category: Category;

  @Column({ type: 'string', array: true, nullable: true })
  photoUrls: string[];

  @Column({ type: 'json', array: true, nullable: true })
  tags: Tag[];

  @Column({ type: 'string', nullable: true })
  status: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this as Pet;
  }
  constructor(obj: any) {
    super();
    const props = ['id', 'name', 'category', 'photoUrls', 'tags', 'status'];
    const newPet = _.pick(obj, props);
    this.deserialize(newPet);
  }
}
