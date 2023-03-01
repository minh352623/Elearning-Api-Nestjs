import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BaseEntity } from 'common/mysql/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './role.enum';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    length: 50,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    default: null,
    nullable: true,
  })
  address: string | null;

  @Column({
    default: null,
    nullable: true,
  })
  avatar: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  roles: UserRole[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
