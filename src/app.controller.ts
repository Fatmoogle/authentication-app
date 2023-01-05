import { Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // login route POST   
  // Will get a JWT, need to do this before 'protected' route
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    console.log(req.body)
    return this.authService.login(req.user)
  }


  // Guard will protect the route. Once hit, it goes into the JwtAuthGuard
  // Must be logged in before hitting this route
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user
  }
}
