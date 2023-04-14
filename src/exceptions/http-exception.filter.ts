import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { error_code } from 'src/common/error_code.enum';
import { LoggerFileService } from 'src/modules/logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggerFileService();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      response.status(status).json({
        status: status,
        code: Array.isArray(exception.getResponse()['message'])
          ? 'VALIDATE_ERROR'
          : exception.getResponse()['message'],
        msg: exception.getResponse()['error'],
        data: Array.isArray(exception.getResponse()['message'])
          ? exception.getResponse()['message']
          : [],
      });
    } else {
      this.logger.error('This is a log message.', exception);
      response.status(status).json({
        status: status,
        code: error_code.OTHER,
        msg: 'Internal server error',
        data: {
          path: request.url,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }
}
