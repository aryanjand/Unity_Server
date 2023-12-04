import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response as Res,
  Session,
  UseFilters,
} from "@nestjs/common";

import { Response } from "express";
import { UserSession } from "../common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import { AuthExceptionFilter } from "./filters/";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseFilters(AuthExceptionFilter)
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(@Session() session: UserSession, @Body() dto: SignInDto) {
    await this.authService.signIn(session, dto);
    return;
  }

  @UseFilters(AuthExceptionFilter)
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() dto: SignUpDto) {
    console.log("Signup ", dto);
    await this.authService.signUp(dto);
    return;
  }
}
