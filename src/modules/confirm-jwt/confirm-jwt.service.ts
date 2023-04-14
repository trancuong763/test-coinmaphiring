import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ConfirmJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user): Promise<string> {
    const { email } = user;
    return this.jwtService.sign({ email });
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
