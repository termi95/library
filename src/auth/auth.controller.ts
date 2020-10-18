import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDto } from '../user/type/user.dto';
import { AuthGuard } from '@nestjs/passport';




@Controller('auth')
export class AuthController {

  constructor (
    private readonly clientsService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post('sign-up')
  async registerUser(@Body() user: UserDto) {
    try {
      await this.clientsService.register(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserDetails(@Req() request: any) {
    const { email } = request.user;
    return await this.clientsService.findUser(email);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}