import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      )
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    if (!request.headers['cookie']) {
      throw new UnauthorizedException('Unauthorized');
    }
    const cookieList = request.headers['cookie'].split(';');
    const jwtCookie = cookieList
      .find((cookie) => cookie.startsWith('jwt='))
      .replace('jwt=', '');
    return jwtCookie;
  }
}
