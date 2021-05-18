import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthErrors } from '../auth.errors';

export class SignupDto {
  @IsNotEmpty({ message: AuthErrors.MISSING_NAME })
  name: string;

  @IsEmail({}, { message: AuthErrors.INVALID_EMAIL })
  emailAddress: string;

  @IsNotEmpty({ message: AuthErrors.MISSING_PASSWORD })
  password: string;
}
