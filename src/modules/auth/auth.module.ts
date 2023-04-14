import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { EmailModule } from '../email/email.module';
import { AuthJwtModule } from '../auth-jwt/auth-jwt.module';
import { ConfirmJwtModule } from '../confirm-jwt/confirm-jwt.module';
import { LoggerFileService } from '../logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    ConfirmJwtModule,
    AuthJwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,LoggerFileService],
})
export class AuthModule {}
