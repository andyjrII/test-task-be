import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() dto: RegisterUserDto): Promise<User | undefined> {
    return await this.usersService.registerUser(dto);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ): Promise<User | undefined> {
    return await this.usersService.editUser(id, dto);
  }
}
