import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(id): Promise<string> {
    const payload = { id };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const user = await this.jwtService.verify(token);
      return user;
    } catch (e) {
      throw e;
    }
  }
}
