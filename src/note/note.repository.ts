import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { NoteErrors } from './note.errors';

@EntityRepository(Note)
export class NoteRepository extends AbstractRepository<Note> {
  public async getNotes(): Promise<Note[]> {
    return this.repository.find();
  }

  public async getNoteById(id: string): Promise<Note> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw new NotFoundException(NoteErrors.NOTE_NOT_FOUND);
    }

    return found;
  }

  public async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { body } = createNoteDto;

    const note = this.repository.create({
      id: uuid(),
      body,
      createdAt: new Date(new Date().toISOString()),
    });

    await this.repository.save(note);

    return note;
  }

  public async updateNoteBody(id: string, body: string): Promise<Note> {
    const note = await this.getNoteById(id);

    note.body = body;

    await this.repository.save(note);

    return note;
  }

  public async deleteNote(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected < 1) {
      throw new NotFoundException(NoteErrors.NOTE_NOT_FOUND);
    }
  }
}
