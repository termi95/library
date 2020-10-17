import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Book } from './book.entity';

@Entity('BookBorrow')
export class BookBorrow {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(type => User, user => user.id)
    personWhoBorrow: number;

    @ManyToOne(type => Book, book => book.id)
    boolThawWasBorrow: number;

    @Column()
    borrowDate: Date;

    @Column()
    returnDate: Date;

    @Column({ type: "decimal", precision: 4})
    bill: number
}
