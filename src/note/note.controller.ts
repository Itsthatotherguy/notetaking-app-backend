import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  public async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.createNote(createNoteDto);
  }

  @Get()
  public async getNotes() {
    return this.noteService.getNotes();
  }

  @Get(':id')
  public async getNoteById(@Param('id') id: string) {
    return this.noteService.getNoteById(id);
  }

  @Patch(':id')
  public async updateNoteBody(
    @Param('id') id: string,
    @Body('body') body: string,
  ) {
    return this.noteService.updateNoteBody(id, body);
  }

  @Delete(':id')
  public async deleteNote(@Param('id') id: string) {
    return this.noteService.deleteNote(id);
  }
}
