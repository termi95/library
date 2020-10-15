import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: UserDto) {
    const { email } = user;
    try {
      const userInDb = await this.userRepository.findOne({ email, });
      if (userInDb) {
        const isUserValid = await compare(user.password, userInDb.password);
        const { password, ...userRes  } = userInDb;
        return isUserValid ? userRes : undefined;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: any) {
    const { email, id, name } = user
    const payload = {
      email,
      id,
      name,
    };
    return {
      token: this.jwtService.sign(payload)
    }
  }


}