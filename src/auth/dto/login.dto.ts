import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthErrors } from '../auth.errors';

export class LoginDto {
  @IsEmail({}, { message: AuthErrors.INVALID_CREDENTIALS })
  emailAddress: string;

  @IsNotEmpty({ message: AuthErrors.INVALID_CREDENTIALS })
  password: string;
}
