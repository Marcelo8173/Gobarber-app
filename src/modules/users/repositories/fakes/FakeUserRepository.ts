import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUSerDTO';
//as funçoes que vão mexer com os dados

class  UsersFakeRepository implements IUserRepositories{   
//atributos
   
    //metodo de procurar agendamentos por mesma dada
    private users: User[] = [];

    public async findByid(id: string): Promise<User | undefined>{
       
        const findUser = this.users.find(user => user.id === id);
       
       return findUser;
    };

    public async findByEmail(email: string): Promise<User | undefined>{
        
        const findUser = this.users.find(user =>
            user.email === email
        );
        
        return findUser;
    }
    
    public async create({email, name, password}:ICreateUsersDTO): Promise<User>{
        
        const user = new User();
        
        Object.assign(user, {id: uuid(), email, name, password});

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User>{
       
        const findIndex = this.users.findIndex(findUser =>
            findUser.id === user.id 
            );

        this.users[findIndex] = user;

        return user;
    }
}

export default UsersFakeRepository;