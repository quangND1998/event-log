import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFillter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFillter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      this.logger.error(`Unexpected error: ${exception.message}`, exception.stack);
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Internal server error: ${message}`, exception.stack);
    } else {
      this.logger.warn(`Client error: ${message}`);
    }

    response.status(status).json(errorResponse);
  }
}