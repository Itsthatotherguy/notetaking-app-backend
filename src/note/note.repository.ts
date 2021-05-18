import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { v4 as uuid } from 'uuid';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NoteErrors } from './note.errors';
import { User } from '../auth/entities/user.entity';
import { DeleteNoteResponseDto } from './dto/delete-note-response.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@EntityRepository(Note)
export class NoteRepository extends AbstractRepository<Note> {
  public async getNotes(user: User): Promise<Note[]> {
    return this.repository.find({ where: { user } });
  }

  public async getNoteById(id: string, user: User): Promise<Note> {
    const found = await this.repository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(NoteErrors.NOTE_NOT_FOUND);
    }

    return found;
  }

  public async createNote(
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<Note> {
    const { title, body } = createNoteDto;

    const note = this.repository.create({
      id: uuid(),
      title,
      body,
      createdAt: new Date(new Date().toISOString()),
      user,
    });

    try {
      await this.repository.save(note);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    delete note.user;

    return note;
  }

  public async updateNote(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const existingNote = await this.getNoteById(id, user);

    const note = {
      ...existingNote,
      ...updateNoteDto,
    };

    try {
      await this.repository.save(note);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return note;
  }

  public async deleteNote(
    id: string,
    user: User,
  ): Promise<DeleteNoteResponseDto> {
    const result = await this.repository.delete({ id, user });

    if (result.affected < 1) {
      throw new NotFoundException(NoteErrors.NOTE_NOT_FOUND);
    }

    return { id };
  }
}
