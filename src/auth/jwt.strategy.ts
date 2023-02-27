import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthPayload } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SERECT_JWT,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthPayload) {
    const { username } = payload;
    const user = this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}