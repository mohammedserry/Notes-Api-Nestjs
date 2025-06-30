import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty({message: "Name is required"})
  @IsString({message: "Name must be string"})
  @MinLength(3, {message: "Name must be at least 3 characters"})
  @MaxLength(30, {message: "Name must be at most 30 characters"})
  name: string;

}