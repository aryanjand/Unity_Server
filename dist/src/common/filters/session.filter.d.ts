import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class SessionExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
