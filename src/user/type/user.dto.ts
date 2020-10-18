import { IsString, IsEmail, MinLength } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @MinLength(8)    
    password: string;
  }
  
  export interface UserBasicInf {
    id: number;
    email: string;
    name: string;
}