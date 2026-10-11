import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../exceptions/domain.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message: string | string[] = 'Internal server error occurred';

    if (exception instanceof DomainException) {
      statusCode = exception.statusCode;
      errorCode = exception.errorCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      errorCode = exceptionResponse.error || 'HTTP_ERROR';
      message = exceptionResponse.message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`[Unhandled Error] ${exception.message}`, exception.stack);
    }

    response.status(statusCode).json({
      success: false,
      error: {
        statusCode,
        errorCode,
        message,
        path: request.url,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
}
