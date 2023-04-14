import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from 'db/DataSource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { AuthJwtModule } from './modules/auth-jwt/auth-jwt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobModule } from './modules/cronjob/cronjob.module';
import { LoggerFileService } from './modules/logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    EmailModule,
    AuthJwtModule,
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
