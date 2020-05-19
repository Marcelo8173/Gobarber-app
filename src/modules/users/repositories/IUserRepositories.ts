import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUSerDTO';
import IFindAllProviderDTO from '@modules/appointments/dtos/IFindAllProviderDTO';

export default interface IUSerRepositories{
    findAllProviders(data:IFindAllProviderDTO): Promise<User[]>;
    findByid(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
};  