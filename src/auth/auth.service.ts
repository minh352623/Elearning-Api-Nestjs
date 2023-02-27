import {
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';

import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTo, RegistrationDTO } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async register(user: RegistrationDTO) {
    try {
      const entity = Object.assign(new UserEntity(), user);
      const userNew = await this.userRepository.save(entity);
      const payload = { username: userNew.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...userNew.toJSON(), token: token } };
    } catch (err) {
      console.log(err);
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(user: LoginDTo) {
    try {
      const userOld = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (!userOld)
        return {
          message: 'Email does not match',
        };
      const isValid = await userOld.comparePassword(user.password);
      if (!isValid)
        return {
          message: 'Password is not valid',
        };

      const payload = { username: userOld.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...userOld.toJSON(), token: token } };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
