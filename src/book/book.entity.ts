import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Books')
export class Book {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column() 
    name: string;

    @Column() 
    descryption: string;

    @Column() 
    author: string;
}