import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicBookInf, BookDto } from './dto/book.dto';
import { BookBorrow } from './entity/bookBorrow.entity';
import { toDate, format, add } from 'date-fns';

@Injectable()
export class BookService {
    EXTENDET_TIME = 7;
    ALLOWED_TIME_TO_BORROW = 14;

    constructor(
        @InjectRepository(Book) 
        private bookRepository: Repository<Book>,
        @InjectRepository(BookBorrow) 
        private bookBorrowRepository: Repository<BookBorrow>,
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

    async addBook(bookDetails:BasicBookInf, userId) {
        const book = this.bookRepository.create(bookDetails);
        book.personWhoAdded = userId;
        book.addedDate = new Date(Date.now());

        try {
            this.bookRepository.save(book);
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

    async editBook(book:BookDto, userId){
        book.personWhoLastEdit = userId;
        book.lastEditDate = new Date(Date.now());
        try {
            return await this.bookRepository.update(book.id,book);        
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async borrowBook(idOfBorrowedBook, userId) {
        try {
            const borrowInf = this.bookBorrowRepository.create();
            const bookToBorrow = (await this.amountOfbook(idOfBorrowedBook));      
            if( bookToBorrow.quantity > 0){
                borrowInf.bookThatWasBorrow = idOfBorrowedBook;
                borrowInf.personWhoBorrow = userId;
                borrowInf.borrowDate = new Date(Date.now());
                borrowInf.returnDate = add(new Date(Date.now()),{days:this.ALLOWED_TIME_TO_BORROW});
                this.bookBorrowRepository.save(borrowInf)

                bookToBorrow.quantity = bookToBorrow.quantity.valueOf() - 1;
                this.bookRepository.update(idOfBorrowedBook,bookToBorrow);
            }
            return await borrowInf;        
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }       
    }

    async amountOfbook(idOfBorrowedBook): Promise<Book> {
        try {                
            const book = await this.bookRepository.findOne(idOfBorrowedBook);
            return book;         
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async extendBookBorrow(borrowedBookDetail, userId){
        const bookWelooking = this.bookBorrowRepository.create();
        bookWelooking.personWhoBorrow = userId;
        bookWelooking.isTimeToReturnWasExtended = false;
        bookWelooking.isReturn = false;
        bookWelooking.bookThatWasBorrow = borrowedBookDetail;

        const borrowedBook = this.bookBorrowRepository.findOne(bookWelooking);
        (await borrowedBook).isTimeToReturnWasExtended = true;
        (await borrowedBook).returnDate = add((await borrowedBook).returnDate,{days:this.EXTENDET_TIME});
        this.bookBorrowRepository.update((await borrowedBook).id,(await borrowedBook));
        return (await borrowedBook);
    }
}
