import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { userEnumStatus } from 'src/common/status.enum';

@Injectable()
export class CronjobService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  /**
   * @description: function sẽ chạy vào 24h mỗi ngày, sẽ tự động xóa các user nào chưa active
   */
  @Cron('0 0 0 * * *')
  async handleCron() {
    const userUnactive = await this.userRepo.find({
      where: { status: userEnumStatus.UNACTIVE },
    });
    if (userUnactive.length > 0) {
      this.userRepo.remove(userUnactive).then(() => {
        console.log('Already deleted all users past the active time');
      });
    }
  }
}
