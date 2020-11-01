import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity('Books')
export class Book {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true, length: 64, nullable: false }) 
    name: string;

    @Column() 
    descryption: string;

    @Column({ unique: true, length: 32, nullable: false }) 
    author: string;
    
    @Column({ type: 'date' })
    addedDate: Date;

    @Column({nullable: true, default: null})
    lastEditDate: Date | null;

    @Column({default: true})
    available: boolean

    @ManyToOne(type => User, user => user.id, {nullable: false})
    personWhoAdded: number;

    @ManyToOne(type => User, user => user.id, {nullable: true})
    personWhoLastEdit: number | null;
}