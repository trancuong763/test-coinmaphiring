import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: process.env.AUTH_JWT_SECRET,
        signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRESIN_TOKEN },
      }),
      global: true,
    },
  ],
  controllers: [],
  providers: [AuthJwtService],
  exports:[AuthJwtService],
})
export class AuthJwtModule {}
