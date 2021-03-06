import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,
     UpdateDateColumn, ManyToOne,
    JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';


@Entity('appointments')
class Appoitments{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    provider_id: string;
    
    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column()
    user_id: string;
    
    @ManyToOne(() => User) //relacionamento 
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
    //caso eu mude. não preciso mudar na interface
    /*
    constructor({ provider, date }: Omit<Appoitments , 'id'>){ //passando todos os tipos exceto o id
        this.id = uuid();
        this.provider = provider,
        this.date = date
    }
    */
}

export default Appoitments;
