import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response as Res,
  Session,
  UseFilters,
} from '@nestjs/common';

import { Response } from 'express';
import { UserSession } from '../common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { AuthExceptionFilter } from './filters/';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('signin')
  signin() {
    return { errors: [] };
  }

  @UseFilters(AuthExceptionFilter)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Session() session: UserSession,
    @Res() res: Response,
    @Body() dto: SignInDto,
  ) {
    await this.authService.signIn(session, dto);
    return res.redirect('/');
  }

  @Get('signup')
  signup() {
    return { errors: [] };
  }

  @UseFilters(AuthExceptionFilter)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Res() res: Response, @Body() dto: SignUpDto) {
    await this.authService.signUp(dto);
    return res.redirect('/');
  }

  @HttpCode(HttpStatus.OK)
  @Get('signout')
  signOut(@Session() session: UserSession, @Res() res: Response) {
    return this.authService.signOut(session, res);
  }

}
