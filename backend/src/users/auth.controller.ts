import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.usersService.findOne(loginDto.email);

    const isPasswordValid = await this.usersService.comparePasswords(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, { httpOnly: true });
  }


  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
  }
}
