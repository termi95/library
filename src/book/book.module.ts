import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entity/book.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'
import { BookBorrow } from './entity/bookBorrow.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Book, BookBorrow]), UserModule],
    exports: [BookService],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
 