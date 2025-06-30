import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateNoteDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(40, { message: 'Title must not exceed 40 characters' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description: string;

  @IsString({ message: 'Color must be a string' })
  color: string = '#fff'; // Default color
}
