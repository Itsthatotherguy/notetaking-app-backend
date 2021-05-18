import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { DeleteNoteResponseDto } from './dto/delete-note-response.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  public async createNote(
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<Note> {
    return this.noteRepository.createNote(createNoteDto, user);
  }

  public async getNotes(user: User): Promise<Note[]> {
    return this.noteRepository.getNotes(user);
  }

  public async getNoteById(id: string, user: User): Promise<Note> {
    return this.noteRepository.getNoteById(id, user);
  }

  public async updateNote(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    return this.noteRepository.updateNote(id, updateNoteDto, user);
  }

  public async deleteNote(
    id: string,
    user: User,
  ): Promise<DeleteNoteResponseDto> {
    return this.noteRepository.deleteNote(id, user);
  }
}
