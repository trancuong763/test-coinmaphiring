import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAuthDto,
  LoginDto,
  ResendEmailConfirmDto,
} from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { ConfirmJwtService } from '../confirm-jwt/confirm-jwt.service';
import { AuthJwtService } from '../auth-jwt/auth-jwt.service';
import { comparePassword, generatePassword } from 'src/common/helpers';
import { error_code } from 'src/common/error_code.enum';
import { classToPlain } from 'class-transformer';
import { userEnumStatus } from 'src/common/status.enum';
import { LoggerFileService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly emailService: EmailService,
    private readonly confirmJwtService: ConfirmJwtService,
    private readonly authJwtService: AuthJwtService,
    private readonly logger: LoggerFileService,
  ) {}
  async create(body: CreateAuthDto) {
    const { email, password } = body;
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (user) {
      if (user.status === userEnumStatus.UNACTIVE) {
        // trường hợp user đã đăng kí nhưng chưa active
        throw new ConflictException(
          error_code.USER_UNACTIVE,
          'user is not active',
        );
      }
      throw new ConflictException(error_code.USER_EXISTS, 'User exist');
    }
    const hashPassword = await generatePassword(password);
    const userNew = new User();
    userNew.email = email;
    userNew.password = hashPassword;
    await this.userRepo.save(userNew);
    const tokenConfirm = await this.confirmJwtService.createToken(userNew);
    this.emailService.sendUserConfirmation(userNew, tokenConfirm).then();
    console.log({ tokenConfirm });
    return [];
  }

  /**
   * @description function resend email khi user không nhận được mail
   * @param body
   * @returns
   */
  async resendConfirmMail(body: ResendEmailConfirmDto) {
    const { email } = body;
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) {
      throw new ConflictException(error_code.USER_NOT_EXISTS, 'User not exist');
    }
    if (user.status !== userEnumStatus.UNACTIVE) {
      throw new ConflictException(error_code.USER_EXISTS, 'User exist');
    }
    const tokenConfirm = await this.confirmJwtService.createToken(user);
    this.emailService.sendUserConfirmation(user, tokenConfirm).then();
    console.log({ tokenConfirm });
    return [];
  }

  async confirmEmail(user) {
    const { id } = user;
    const getUser = await this.userRepo.findOne({
      where: { id, status: userEnumStatus.UNACTIVE },
    });
    getUser.status = userEnumStatus.ACTIVE;
    await this.userRepo.save(getUser);
    return [];
  }

  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(error_code.USER_NOT_EXISTS);
    }
    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      throw new NotFoundException(error_code.USER_NOT_EXISTS);
    }
    const token = await this.authJwtService.createToken(user.id);
    return {
      token,
      user: classToPlain(user),
    };
  }
}
