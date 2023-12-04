import { Response } from 'express';
import { UserSession } from '../common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(): {
        errors: any[];
    };
    signIn(session: UserSession, res: Response, dto: SignInDto): Promise<void>;
    signup(): {
        errors: any[];
    };
    signUp(res: Response, dto: SignUpDto): Promise<void>;
    signOut(session: UserSession, res: Response): Promise<void>;
}
