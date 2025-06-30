import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async create(
    createNoteDto: CreateNoteDto,
    currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    const note = this.notesRepository.create(createNoteDto);
    note.user = currentUser;

    const savedNote = await this.notesRepository.save(note);

    return {
      status: 'Success',
      statusCode: 201,
      data: savedNote,
    };
  }

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: Note[];
  }> {
    const notes = await this.notesRepository.find({
      relations: {
        user: true,
      },
    });

    return {
      count: notes.length,
      statusCode: 200,
      data: notes,
    };
  }

  async getMyNotes(currentUser: User): Promise<{
    count: number;
    statusCode: number;
    data: Note[];
  }> {
    const notes = await this.notesRepository.find({
      where: { user: { id: currentUser.id } },
      relations: {
        user: true,
      },
    });

    return {
      count: notes.length,
      statusCode: 200,
      data: notes,
    };
  }

  async getMyNoteById(
    noteId: number,
    currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId, user: { id: currentUser.id } },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(
        `Note with ID ${noteId} not found for user ${currentUser.id}`,
      );
    }

    return {
      status: 'Success',
      statusCode: 200,
      data: note,
    };
  }

  async updateMyNoteById(
    noteId: number,
    updateNoteDto: UpdateNoteDto,
    currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId, user: { id: currentUser.id } },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(
        `Note with ID ${noteId} not found for user ${currentUser.id}`,
      );
    }
    // Update the note with the new data
    Object.assign(note, updateNoteDto);
    const updatedNote = await this.notesRepository.save(note);

    return {
      status: 'Success',
      statusCode: 200,
      data: updatedNote,
    };
  }

  async deleteMyNoteById(
    noteId: number,
    currentUser: User,
  ): Promise<{
    status: string;
    statusCode: number;
    message: string;
  }> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId, user: { id: currentUser.id } },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(
        `Note with ID ${noteId} not found for user ${currentUser.id}`,
      );
    }

    await this.notesRepository.remove(note);

    return {
      status: 'Success',
      statusCode: 200,
      message: `Note with ID ${noteId} deleted successfully`,
    };
  }

  async findOne(noteId: number): Promise<{
    status: string;
    statusCode: number;
    data: Note;
  }> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    return {
      status: 'Success',
      statusCode: 200,
      data: note,
    };
  }

  async update(noteId: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    // Update the note with the new data
    Object.assign(note, updateNoteDto);

    const updatedNote = await this.notesRepository.save(note);

    return {
      status: 'Success',
      statusCode: 200,
      data: updatedNote,
    };
  }

  async remove(noteId: number) {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    await this.notesRepository.remove(note);

    return {
      status: 'Success',
      statusCode: 200,
      message: `Note with ID ${noteId} deleted successfully`,
    };
  }
}
