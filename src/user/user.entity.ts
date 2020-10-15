import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
    id: number;
 
  @Column({ unique: true, length: 128 })
    email: string;
 
  @Column({ unique: true, length: 32 })
    name: string;
 
  @Column()
    password: string;
}