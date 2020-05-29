import AppError from '@shared/error/AppError';
import FakeUsersRepositories from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from "@shared/container/providers/CachedProvider/fakes/FakeRedisCacheProvider";

import ListProviderService from "@modules/appointments/services/ListProviderService";

let fakeUsersRepositories: FakeUsersRepositories;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;


describe('LisProviderService', ()=>{
    beforeEach(()=>{
        fakeUsersRepositories = new FakeUsersRepositories();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderService = new ListProviderService(fakeUsersRepositories,fakeCacheProvider);
    })
    it('should be able to list the providers', async ()=>{
        const user1 = await fakeUsersRepositories.create({
            email: 'marcelo@bio.com',
            name: 'Marcelo',
            password: '123123123',
        })

        const user2 = await fakeUsersRepositories.create({
            email: 'marceloasda@bio.com',
            name: 'Marceloasda',
            password: '1231231as23',
        })

        const logerUser = await fakeUsersRepositories.create({
            email: 'marcelo12@bio.com',
            name: 'Marcelo12',
            password: '123123123',
        })

        const providers = await listProviderService.execute({
            user_id: logerUser.id,
        })

        expect(providers).toEqual([user1,user2])
    })
})
