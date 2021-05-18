import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { DeleteNoteResponseDto } from './dto/delete-note-response.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.createNote(createNoteDto, user);
  }

  @Get()
  public async getNotes(@GetUser() user: User): Promise<Note[]> {
    return this.noteService.getNotes(user);
  }

  @Get(':id')
  public async getNoteById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.getNoteById(id, user);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  public async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.updateNote(id, updateNoteDto, user);
  }

  @Delete(':id')
  public async deleteNote(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteNoteResponseDto> {
    return this.noteService.deleteNote(id, user);
  }
}
