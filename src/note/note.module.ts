import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepository]), AuthModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
