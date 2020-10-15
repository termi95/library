import { Body, Controller, Post } from '@nestjs/common';
import UserDto from './user.dto';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/register')
  async register(@Body() userData: UserDto){
    return await this.userService.register(userData);
  }

}