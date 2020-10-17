import { IsInt, IsString } from 'class-validator';

export class BookDto {
    @IsInt()
    id: number;
    @IsString()
    name: string;
    descryption: string;
    @IsString()
    author: string;
    @IsInt()
    quantity: number;
}