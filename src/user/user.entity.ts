import { BaseEntity } from 'common/mysql/base.entity';
import { Column, Entity } from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'client',
  GHOST = 'ghost',
}

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    length: 50,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    length: 50,
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  avatar: string;

  @Column()
  role: number;
}
