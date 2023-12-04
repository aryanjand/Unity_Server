import { Response } from 'express';
import { UserSession } from '../common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(session: UserSession, res: Response, dto: SignInDto): Promise<void>;
    signUp(dto: SignUpDto): Promise<void>;
}
