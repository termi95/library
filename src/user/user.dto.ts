import { IsString, IsEmail } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    password: string;
  }
   
  export default UserDto;