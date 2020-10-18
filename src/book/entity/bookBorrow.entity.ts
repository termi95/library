import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Book } from './book.entity';

@Entity('BookBorrow')
export class BookBorrow {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(type => User, user => user.id, {nullable:false})
    personWhoBorrow: number;

    @ManyToOne(type => Book, book => book.id, {nullable:false})
    bookThatWasBorrow: number;

    @Column({nullable:false})
    borrowDate: Date;

    @Column({nullable:false})
    returnDate: Date;

    @Column({ type: "decimal", precision: 4, default:0})
    bill: number
    
    @Column({default:false})
    isReturn:boolean
}
