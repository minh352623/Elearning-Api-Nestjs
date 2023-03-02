import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { UserRole } from './role.enum';
export class UserDto {
  @Expose()
  id: number;

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

  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export interface AuthPayload {
  username: string;
  email?: string;
}

export class UpdateUserDTO {
  @IsOptional()
  age: number;

  @IsOptional()
  address: number;

  username: number;

  @IsOptional()
  avatar: string;

  // @Exclude() //bo cai nay moi validate
  @MinLength(4)
  @IsOptional()
  password: string;
}
