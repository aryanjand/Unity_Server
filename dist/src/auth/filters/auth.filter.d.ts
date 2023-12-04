import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): {
        errors: any;
    };
}
