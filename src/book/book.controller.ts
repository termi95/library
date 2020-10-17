import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('book')
export class BookController {
    constructor(private readonly BookService: BookService) {}

    @Get('/all')
    async getBook() {
        return await this.BookService.getBooks();
    }

    @Get('/find')
    async findBook(@Body() book: BookDto) {
        return await this.BookService.findBook(book);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addBook(@Req() request: any, @Body() book: BookDto) {
        const { userId } = request.user;
        return await this.BookService.addBook(book, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/edit')
    async editBook(@Body() book: BookDto) { 
        return await this.BookService.editBook(book);
    }
    @UseGuards(JwtAuthGuard)
    @Post('/remove')
    async removeBook(@Body() bookId: BookDto) { 
        return await this.BookService.removeBook(bookId);
    }
}
