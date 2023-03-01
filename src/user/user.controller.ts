import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/user.decorator';
import { RolesGuard } from './roles.guard';
import { UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { Roles } from './roles.decorator';
import { UserRole } from './role.enum';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  upadteUser(@GetUser() { id }: any, @Body() userData: UpdateUserDTO) {
    try {
      const dataNew = plainToClass(UpdateUserDTO, userData, {
        excludeExtraneousValues: false,
      });
      return this.userService.update(id, dataNew);
    } catch (err) {
      console.log(err);
    }
  }
}
