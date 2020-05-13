import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { getRepository, Repository } from 'typeorm';
import IUserTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';
//as funçoes que vão mexer com os dados

class  UserTokenRepository implements IUserTokenRepositories{   
//atributos
    private ormRepository : Repository<UserToken>;

    constructor(){
        this.ormRepository = getRepository(UserToken);
    }
    
    public async findByToken(token: string):Promise<UserToken | undefined> {
        
        const UserToken = await this.ormRepository.findOne(
            {where : {token}}
        );

        return UserToken;
    }

    public async generate(user_id: string):Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        })

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokenRepository;