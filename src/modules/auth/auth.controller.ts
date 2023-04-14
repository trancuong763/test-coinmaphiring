import { classToPlain } from 'class-transformer';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  LoginDto,
  TokenDto,
  ResendEmailConfirmDto,
} from './dto/create-auth.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtConfirmGuard } from 'src/guard/jwt-confirm-guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth-guard';
import { ResponseInterceptor } from 'src/interceptors/response';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Đăng kí user' })
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }
  @Post('/resend-email')
  @ApiOperation({ summary: 'Gửi lại token confirm cho email vừa đăng kí' })
  async resendConfirmMail(
    @Body() resendEmailConfirmDto: ResendEmailConfirmDto,
  ) {
    return await this.authService.resendConfirmMail(resendEmailConfirmDto);
  }

  @Get('/confirm-email')
  @ApiOperation({ summary: 'Api xác thực email' })
  @UseGuards(JwtConfirmGuard)
  async confirmEmail(@Query() query: TokenDto, @Request() req) {
    const { user } = req;
    return await this.authService.confirmEmail(user);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Api login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api lấy thông tin user đăng nhập' })
  infoUser(@Request() req) {
    const { user } = req;
    return classToPlain(user);
  }
}
