import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
  Param,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ValidationPipe,
} from '@nestjs/common/pipes';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/user.decorator';
import { RolesGuard } from './roles.guard';
import { UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { Roles } from './roles.decorator';
import { UserRole } from './role.enum';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { store_config } from 'utils/config-store';
import { CloudinaryService } from 'src/cloundinay/cloudinary.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Roles(UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('avatar', store_config))
  async createUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    avatar: Express.Multer.File,
    @Body() userData: UpdateUserDTO,
  ) {
    try {
      console.log(avatar);

      return await this.cloudinaryService.uploadImage(avatar);
    } catch (err) {
      console.log(err);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  upadteUser(@Param('id') id: number, @Body() userData: UpdateUserDTO) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      const dataNew = plainToClass(UpdateUserDTO, userData, {
        excludeExtraneousValues: false,
      });
      return this.userService.update(id, dataNew);
    } catch (err) {
      console.log(err);
    }
  }

  getCurrentUser(@GetUser() user: any) {
    try {
      if (!user) throw new NotFoundException();
      const dataNew = plainToClass(UpdateUserDTO, user, {
        excludeExtraneousValues: false,
      });
      return dataNew;
    } catch (err) {
      console.log(err);
    }
  }
}
