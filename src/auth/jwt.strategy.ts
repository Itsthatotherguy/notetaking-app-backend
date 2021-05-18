import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topsecret',
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const { emailAddress } = payload;

    const user = await this.userRepository.findUserByEmail(emailAddress);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
