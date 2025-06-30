import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthroizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async findAll(): Promise<{
    count: number;
    data: User[];
    statusCode: number;
  }> {
    return await this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  getProfile(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Patch('me')
  @UseGuards(AuthenticationGuard)
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.userService.updateMyProfile(updateUserDto, currentUser);
  }

  @Delete('me')
  @UseGuards(AuthenticationGuard)
  async deleteProfile(@CurrentUser() currentUser: User) {
    return await this.userService.deleteMyProfile(currentUser);
  }

  @Get(':userId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async findOne(@Param('userId') userId: number): Promise<{
    statusCode: number;
    status: string;
    data: User;
  }> {
    return await this.userService.findOne(userId);
  }

  @Delete(':userId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  remove(@Param('userId') userId: number): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    return this.userService.remove(userId);
  }
}
