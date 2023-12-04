import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const route: RouteTree = request.route;

    response.status(exception.getStatus());

    if (exception.getResponse()['message'] === 'Invalid credentials') {
      return  {
        errors: [exception.getResponse()['message']],
      };
    }

    return {
      errors: exception.getResponse()['message'],
    };
  }
}
