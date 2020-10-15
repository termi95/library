import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Books')
export class Book {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true, length: 64 }) 
    name: string;

    @Column() 
    descryption: string;

    @Column({ unique: true, length: 32 }) 
    author: string;

    @Column() 
    quantity: number;
}