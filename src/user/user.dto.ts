import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { UserRole } from './role.enum';
export class UserDto {
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
  role: UserRole[];

  @Expose()
  age: number;
}

export class LoginDTo {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegistrationDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export interface AuthPayload {
  username: string;
  email?: string;
}
