import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { UserSession } from "../common";
import { PrismaService } from "../prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";

@Injectable()
export class AuthService {
  private readonly saltRounds: number;

  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.saltRounds = this.config.get("SALT_ROUNDS", 12);
  }

  async signIn(session: UserSession, dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isValid = bcrypt.compareSync(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    delete user.password;

    session.authenticated = true;
    session.user = user;

    return;
  }

  async signUp(session: UserSession, dto: SignUpDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: bcrypt.hashSync(dto.password, this.saltRounds),
          first_name: dto.firstName,
          last_name: dto.lastName,
        },
      });

      delete user.password;

      session.authenticated = true;
      session.user = user;
    } catch (err) {
      if (err.code === "P2002") {
        throw new HttpException("Credentials taken", HttpStatus.CONFLICT);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signOut(session: UserSession, res: Response) {
    res.clearCookie("connect.sid");

    session.destroy((err) => {
      if (err) {
        throw new HttpException(err.message, HttpStatus.SERVICE_UNAVAILABLE);
      }
    });
    return {};
  }
}
