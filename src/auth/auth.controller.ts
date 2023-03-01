import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTo, RegistrationDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
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
      console.log(user);

      return this.authService.login(user);
    } catch (err) {
      return err;
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
