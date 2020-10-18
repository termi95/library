import { IsDate, IsInt, IsString } from 'class-validator';

export class BookDto implements BasicBookInf {
    @IsInt()
    id: number;
    @IsString()
    name: string;
    descryption: string;
    @IsString()
    author: string;
    @IsInt()
    quantity: number;
    @IsInt()
    personWhoLastEdit
    @IsDate()
    lastEditDate
}

export interface BasicBookInf {
    name: string;
    descryption: string;
    author: string;
    quantity: number;
}