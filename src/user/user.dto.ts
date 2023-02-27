import { Expose, Transform } from 'class-transformer';
import { UserRole } from './user.entity';
import { BaseDto } from '../../common/base.dto';
export class UserDto extends BaseDto {
  @Expose()
  id: number;

  firstName: string;
  lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  fullName: string;

  @Expose()
  avatar: string;

  @Expose()
  description: string;

  @Expose()
  role: UserRole;

  @Expose()
  age: number;
}
