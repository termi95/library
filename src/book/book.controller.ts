import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto'

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

    @Post('/add')
    async addBook(@Body() book: BookDto) { 
        return await this.BookService.addBook(book);
    }

    @Post('/edit')
    async editBook(@Body() book: BookDto) { 
        return await this.BookService.editBook(book);
    }

    @Post('/remove')
    async removeBook(@Body() bookId: BookDto) { 
        return await this.BookService.removeBook(bookId);
    }
}
