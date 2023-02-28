import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/user.decorator';
import { UserRole } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(JwtAuthGuard) //check login chạy vào hàm validate trong jwt.strategy
  @UseGuards(JwtAuthGuard, RolesGuard) //check login chạy vào hàm validate trong jwt.strategy
  @Roles(UserRole.ADMIN) //chạy vào hàm canActivate
  getProfileUser(@GetUser() user: any) {
    return user;
  }
}
