import AppError from '@shared/error/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUserRepository';
import FakeHahsProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from "@shared/container/providers/CachedProvider/fakes/FakeRedisCacheProvider";
import CreateUSerService from './CreateUSerService';

//o ideal que o teste não dependa de mais nada, apenas dele
describe('CreateUsers', () =>{
   
    it('Should be able to create a new user', async () =>{

        const fakeUserRepository = new FakeUsersRepositories();
        const fakeHahsProvider = new FakeHahsProvider();
        const fakeCacheProvider = new FakeCacheProvider();

        const createUsers = new CreateUSerService(fakeUserRepository, fakeHahsProvider,fakeCacheProvider);
        
        const user = await createUsers.execute({
            email: 'marcelobio@gmail.com',
            name: 'marcelo',
            password: '1234567'
        });

        expect(user).toHaveProperty('id');
    })

    it('Should not be able to create a new user whit same email', async () =>{
        const fakeUserRepository = new FakeUsersRepositories();
        const fakeHahsProvider = new FakeHahsProvider();
        const fakeCacheProvider = new FakeCacheProvider();


        const createUsers = new CreateUSerService(fakeUserRepository, fakeHahsProvider,fakeCacheProvider);
         await createUsers.execute({
            email: 'marcelobio@gmail.com',
            name: 'marcelo',
            password: '1234567'
        });

        expect(createUsers.execute({
            email: 'marcelobio@gmail.com',
            name: 'marcelo',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError);
    })

    
})