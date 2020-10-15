import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcrypt';
import UserDto from './user.dto';
 
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 
  async register(userData: UserDto) {
    try{
      const hashPassword = await bcrypt.hash(userData.password,10);
      userData.password = hashPassword;
      const newUser = await this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;                
    } catch (error) {            
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

}