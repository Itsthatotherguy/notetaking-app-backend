import { IsNotEmpty } from 'class-validator';
import { NoteErrors } from '../note.errors';

export class CreateNoteDto {
  @IsNotEmpty({ message: NoteErrors.MISSING_TITLE })
  title: string;

  @IsNotEmpty({ message: NoteErrors.MISSING_BODY })
  body: string;
}
