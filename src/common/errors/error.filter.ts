import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class ErrorsInterceptor implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = exception.status || 500;
    let message = exception.message || 'Internal Server Error';
    const error = exception.name;

    switch (true) {
      case exception instanceof EntityNotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        message = exception.message;
        break;
      case exception instanceof BadRequestException:
        const badRequestResponse = exception.getResponse() as
          | string
          | Record<string, unknown>;

        if (typeof badRequestResponse === 'string') {
          message = badRequestResponse;
        } else if (typeof badRequestResponse === 'object') {
          message = badRequestResponse.message;
        }
        break;
    }

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      message,
      error,
    });
  }
}
