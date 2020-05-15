import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';
import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUSerDTO';
//as funçoes que vão mexer com os dados

class  UsersRepository implements IUserRepositories{   
//atributos
    private ormRepository : Repository<User>;

    constructor(){
        this.ormRepository = getRepository(User);
    }
    //metodo de procurar agendamentos por mesma dada

    public async findByid(id: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where: {id}
        });

        return user
    };

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where: {email}
        });
        return user
    }
    
    public async create({email, name, password}:ICreateUsersDTO): Promise<User>{
        const appointment = this.ormRepository.create({
            email,
            name,
            password,
        });
        
        await this.ormRepository.save(appointment); //salvando no banco de dados

        return appointment;
    }

    public async save(users: User): Promise<User>{
        return this.ormRepository.save(users);
    }
}

export default UsersRepository;