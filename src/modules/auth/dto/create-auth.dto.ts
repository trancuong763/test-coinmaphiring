import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    maxLength: 50,
    minLength: 6,
  })
  @MaxLength(50)
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    maxLength: 50,
    minLength: 6,
  })
  @MaxLength(50)
  @MinLength(6)
  password: string;
}

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'token được gửi vào email để xác nhận',
  })
  token: string;
}

export class ResendEmailConfirmDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email phải được đăng kí trước đó',
  })
  email: string;
}
