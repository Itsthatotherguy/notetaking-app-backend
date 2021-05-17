import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepository])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
