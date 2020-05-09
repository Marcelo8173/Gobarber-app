import AppError from '@shared/error/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import FakeUSerRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateAvatar from './updateUserAvatar';

//o ideal que o teste não dependa de mais nada, apenas dele
describe('UpdateAvatar', () =>{
   
    it('Should be able uptade avatar of user', async () =>{

        const fakeStorageProvider = new FakeStorageProvider();
        const fakeUSerRepository = new FakeUSerRepository();
        const updateAvatar = new UpdateAvatar(fakeUSerRepository, fakeStorageProvider);
        
        const user = await fakeUSerRepository.create({
            email: 'example@example.com',
            name: 'example name',
            password: '1234567',
        })

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png'    
        });

        expect(user.avatar).toBe('avatar.png');
    })

    it('Should delete old avatar', async () =>{

        const fakeStorageProvider = new FakeStorageProvider();
        const fakeUSerRepository = new FakeUSerRepository();

        const deleFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateAvatar = new UpdateAvatar(fakeUSerRepository, fakeStorageProvider);
        
        const user = await fakeUSerRepository.create({
            email: 'example@example.com',
            name: 'example name',
            password: '1234567',
        })

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png'    
        });

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.png'    
        });

        expect(deleFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar2.png');
    });
    
});