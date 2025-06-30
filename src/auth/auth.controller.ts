import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { User } from 'src/user/entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<{
    statusCode: number;
    data: Omit<User, 'password'>;
    accessToken: string;
  }> {
    return await this.authService.signUp(userSignUpDto);
  }

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto): Promise<{
    statusCode: number;
    data: Omit<User, 'password'>;
    accessToken: string;
  }> {
    return await this.authService.signIn(userSignInDto);
  } 
}
