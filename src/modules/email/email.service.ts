import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { precompile } from 'handlebars';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string) {
    const url = `${process.env.URL_CONFIRM_EMAIL}?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to App! Confirm your Email',
      template: './confirm-email.hbs',
      context: {
        name: user.email,
        url,
      },
    });
  }
}
