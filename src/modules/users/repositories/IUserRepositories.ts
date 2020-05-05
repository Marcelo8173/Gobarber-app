import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUSerDTO';

export default interface IUSerRepositories{
    findByid(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
};