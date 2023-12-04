import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserSession } from '../common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
export declare class AuthService {
    private prisma;
    private config;
    private readonly saltRounds;
    constructor(prisma: PrismaService, config: ConfigService);
    signIn(session: UserSession, dto: SignInDto): Promise<void>;
    signUp(dto: SignUpDto): Promise<void>;
    signOut(session: UserSession, res: Response): Promise<void>;
    profile(user: User): Promise<{
        id: number;
        username: string;
        firstName: string;
        lastName: string;
    }>;
}
