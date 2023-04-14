import { Module } from '@nestjs/common';
import { ConfirmJwtService } from './confirm-jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: process.env.CONFIRM_JWT_SECRET,
        signOptions: { expiresIn: process.env.CONFIRM_JWT_EXPIRESIN_TOKEN },
      }),
      global: true,
    },
  ],
  controllers: [],
  providers: [ConfirmJwtService],
  exports: [ConfirmJwtService],
})
export class ConfirmJwtModule {}
