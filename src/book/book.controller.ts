import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BasicBookInf, BookDto } from './dto/book.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookBorrowInterface } from './dto/bookBorrow.dto';
import { UserObj } from 'decorators/user.decorator';
import { UserBasicInf } from 'src/user/type/user.dto';

@Controller('book')
export class BookController {
    constructor(private readonly BookService: BookService) {}

    @Get('/all')
    async getBook() {
        return await this.BookService.getBooks();
    }

    @Get('/find')
    async findBook(@Body() book: BasicBookInf) {
        return await this.BookService.findBook(book);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addBook(@UserObj() user: UserBasicInf, @Body() book: BasicBookInf) {        
        return await this.BookService.addBook(book, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/edit')
    async editBook(@UserObj() user: UserBasicInf, @Body() book: BookDto) {
        return await this.BookService.editBook(book, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/remove')
    async removeBook(@Body() bookId: BookDto) { 
        return await this.BookService.removeBook(bookId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/borrow')    
    async borrowBook(@UserObj() user: UserBasicInf, @Body() bookId: BookBorrowInterface) {
        return await this.BookService.borrowBook(bookId.idOfBorrowedBook, user.id);
    }
}
