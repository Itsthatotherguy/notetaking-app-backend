import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  public async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteRepository.createNote(createNoteDto);
  }

  public async getNotes(): Promise<Note[]> {
    return this.noteRepository.getNotes();
  }

  public async getNoteById(id: string): Promise<Note> {
    return this.noteRepository.getNoteById(id);
  }

  public async updateNoteBody(id: string, body: string): Promise<Note> {
    return this.noteRepository.updateNoteBody(id, body);
  }

  public async deleteNote(id: string): Promise<void> {
    return this.noteRepository.deleteNote(id);
  }
}
