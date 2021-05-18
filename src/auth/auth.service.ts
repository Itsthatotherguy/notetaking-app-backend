import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthErrors } from './auth.errors';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.signup(signupDto);

    return this.handleAuthentication(user.emailAddress);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const emailAddress = await this.userRepository.validateUserPassword(
      loginDto,
    );

    if (!emailAddress) {
      throw new UnauthorizedException(AuthErrors.INVALID_CREDENTIALS);
    }

    return this.handleAuthentication(emailAddress);
  }

  private async handleAuthentication(
    emailAddress: string,
  ): Promise<AuthResponseDto> {
    const payload: JwtPayloadDto = {
      emailAddress,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      expiresIn: 3600,
    };
  }
}
