import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) 
        private bookRepository: Repository<Book>,
        ) {}

    async getBooks(){
        try {
            return await this.bookRepository.find();            
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findBook(book){
        try {
            return await this.bookRepository.find(book);            
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addBook(bookDetails:BookDto) {
        const book = this.bookRepository.create(bookDetails);
        this.bookRepository.save(book);
        try {
            return await book;            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeBook(id){
        try {
            return await this.bookRepository.delete(id);        
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async editBook(book:BookDto){
        try {
            return await this.bookRepository.update(book.id,book);        
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
