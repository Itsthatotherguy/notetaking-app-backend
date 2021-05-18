import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'topsecret',
  signOptions: {
    expiresIn: 3600,
  },
};
