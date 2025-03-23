import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    client: string;

    @Column()
    itens: string;

    @Column()
    total: number;

    @Column({enum: ['pendining', 'done', 'cancelled'], default: 'pending'})
    status: string;
} 