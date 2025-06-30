import { PartialType } from '@nestjs/mapped-types';
import { UserSignUpDto } from 'src/auth/dto/user-signup.dto';

export class UpdateUserDto extends PartialType(UserSignUpDto) {}
