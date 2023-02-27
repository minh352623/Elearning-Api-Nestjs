import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTo, RegistrationDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body(ValidationPipe) user: RegistrationDTO) {
    try {
      return this.authService.register(user);
    } catch (err) {
      console.log(err);
    }
  }

  @Post('/login')
  login(@Body(ValidationPipe) user: LoginDTo) {
    try {
      return this.authService.login(user);
    } catch (err) {
      console.log(err);
    }
  }
}
