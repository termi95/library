import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import UserDto from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('User')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/register')
  async register(@Body() userData: UserDto){
    return await this.userService.register(userData);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/details')
  getDetails(@Req() req) {
    return req.user;
  }

}