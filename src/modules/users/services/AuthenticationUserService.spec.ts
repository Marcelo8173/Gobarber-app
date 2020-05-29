import AppError from '@shared/error/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from "@shared/container/providers/CachedProvider/fakes/FakeRedisCacheProvider";

import AuthUserService from './AuthUserServices';
import CreateUserService from './CreateUSerService';

//o ideal que o teste não dependa de mais nada, apenas dele

describe('AuthenticateUser', () =>{
    it('should be able to authenticate', async () =>{
        const fakeUser = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();
        const fakeCacheProvider = new FakeCacheProvider();

        const createUSer = new CreateUserService(fakeUser, fakeHashProvider,fakeCacheProvider);
        const authenticateUser = new AuthUserService(fakeUser, fakeHashProvider);

        const user = await createUSer.execute({
            email: 'marcelobio@gmail.com',
            name: 'marcelo',
            password: '1234567'
        })



        expect(authenticateUser.execute({
            email: 'marcelobio@gmail.com',
            password: '1234567',
        })).toHaveProperty('token');
        

    });

    it('should not be able authenticate with non existing user', async () =>{
        const fakeUser = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();
        
        const authenticateUser = new AuthUserService(fakeUser, fakeHashProvider);

        expect(authenticateUser.execute({
            email: 'marcelobio@gmail.com',
            password: '1234567',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate wiht wrong password', async () =>{
        const fakeUser = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();
        const fakeCacheProvider = new FakeCacheProvider();

        const createUSer = new CreateUserService(fakeUser, fakeHashProvider,fakeCacheProvider);
        const authenticateUser = new AuthUserService(fakeUser, fakeHashProvider);

        const user = await createUSer.execute({
            email: 'marcelobio@gmail.com',
            name: 'marcelo',
            password: '1234567'
        })


      


        expect(authenticateUser.execute({
            email: 'marcelobio@gmail.com',
            password: 'wrong',
        })).rejects.toBeInstanceOf(AppError);

    });


});