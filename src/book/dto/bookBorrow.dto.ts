import { IsBoolean, IsDate, IsInt, IsNumber } from 'class-validator';

export class BookBorrowDto {
    @IsInt()
    idOfBorrowedBook: number;
    @IsInt()
    idOfPersonWhoBorrow: number;
    @IsDate()
    borrowDate: Date;
    @IsDate()
    returnDate: Date;
    @IsNumber()    
    bill: number;
    @IsBoolean()
    isReturn:boolean;
}

export interface BookBorrowInterface {
    idOfBorrowedBook: number;
}