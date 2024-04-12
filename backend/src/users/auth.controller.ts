import { Controller, Post, Body, UnauthorizedException, Res, UseGuards, Req, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.usersService.findOne(loginDto.email);
    const isPasswordValid = await this.usersService.comparePasswords(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    res.cookie('jwt', token, { 
      httpOnly: true, 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      sameSite: 'lax', 
      secure: process.env.NODE_ENV === 'dev' 
    }).send({
      success: true
    });
  }


  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return req.user;
  }
}
