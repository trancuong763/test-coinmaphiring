import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CronjobService],
  exports: [CronjobService],
})
export class CronjobModule {}
