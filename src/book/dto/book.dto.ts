import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class BookDto implements BasicBookInf {
    @IsInt()
    id: number;
    @IsString()
    name: string;
    descryption: string;
    @IsString()
    author: string;
    @IsInt()
    personWhoLastEdit
    @IsDate()
    lastEditDate
    @IsBoolean()
    available
}

export interface BasicBookInf {
    name: string;
    descryption: string;
    author: string;
    available: boolean;
}