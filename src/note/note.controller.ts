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
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Note } from './entities/note.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { AuthroizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.noteService.create(createNoteDto, currentUser);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: Note[];
  }> {
    return await this.noteService.findAll();
  }

  @Get('my-notes')
  @UseGuards(AuthenticationGuard)
  async getMyNotes(@CurrentUser() currentUser: User): Promise<{
    count: number;
    statusCode: number;
    data: Note[];
  }> {
    return await this.noteService.getMyNotes(currentUser);
  }

  @Get('my-notes/:noteId')
  @UseGuards(AuthenticationGuard)
  async getMyNoteById(
    @Param('noteId') noteId: number,
    @CurrentUser() currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    return await this.noteService.getMyNoteById(noteId, currentUser);
  }

  @Patch('my-notes/:noteId')
  @UseGuards(AuthenticationGuard)
  async updateMyNoteById(
    @Param('noteId') noteId: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    return await this.noteService.updateMyNoteById(
      noteId,
      updateNoteDto,
      currentUser,
    );
  }

  @Delete('my-notes/:noteId')
  @UseGuards(AuthenticationGuard)
  async deleteMyNoteById(
    @Param('noteId') noteId: number,
    @CurrentUser() currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    message: string;
  }> {
    return await this.noteService.deleteMyNoteById(noteId, currentUser);
  }

  @Get(':noteId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async findOne(@Param('noteId') noteId: number) {
    return await this.noteService.findOne(noteId);
  }

  @Patch(':noteId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async update(@Param('noteId') noteId: number, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.noteService.update(noteId, updateNoteDto);
  }

  @Delete(':noteId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async remove(@Param('noteId') noteId: number) {
    return await this.noteService.remove(noteId);
  }
}
