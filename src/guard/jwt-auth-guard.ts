import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { error_code } from 'src/common/error_code.enum';
import { userEnumStatus } from 'src/common/status.enum';
import { AuthJwtService } from 'src/modules/auth-jwt/auth-jwt.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: AuthJwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    if (!token) {
      if (!request.query.token) {
        throw new UnauthorizedException(error_code.UNAUTHORIZED);
      }
      token = request.query.token;
    }
    try {
      const payload = await this.jwtService.verifyToken(token);
      const { id } = payload;
      const user = await this.userRepo.findOne({
        where: { id, status: userEnumStatus.ACTIVE },
      });
      if (!user) {
        throw new UnauthorizedException(error_code.UNAUTHORIZED);
      }
      request['user'] = user;
    } catch {
      throw new UnauthorizedException(error_code.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
