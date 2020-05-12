import AppError from '@shared/error/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUserRepository';
import FakesUserTokensRespositories from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepositories;
let fakesUserTokensRespositories: FakesUserTokensRespositories;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

//o ideal que o teste não dependa de mais nada, apenas dele
describe('ResetPasswordService', () =>{
    
    beforeEach(() =>{
        fakeUserRepository = new FakeUsersRepositories();
        fakesUserTokensRespositories = new FakesUserTokensRespositories();
        fakeHashProvider = new FakeHashProvider;

        resetPassword =  new ResetPasswordService(fakeUserRepository,
            fakesUserTokensRespositories,
            fakeHashProvider);
    });

    it('Should be able to reset the password', async () =>{
           
            const user = await fakeUserRepository.create({
                email: 'jhon@example.com',
                name: 'qualquer nome',
                password: '1234567'
            });

            const {token} = await fakesUserTokensRespositories.generate(user.id);
            const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

            await resetPassword.execute({
                password: '123123',
                token,
            });

            const updatUser = await fakeUserRepository.findByid(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatUser.password).toBe('123123')
    });

    it('Should not be able to reset the password with non-existing token' , async () =>{
        await expect(
            resetPassword.execute({
                token: 'non-existing',
                password: '1123123'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to reset the password with non-existing user' , async () =>{
       const {token} = await fakesUserTokensRespositories.generate('non-existing user');

        await expect(
            resetPassword.execute({
                token,
                password: '1123123'
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it('Should not be able to reset the password if passed more than 2 hours' , async () =>{
        const user = await fakeUserRepository.create({
            email: 'jhon@example.com',
            name: 'qualquer nome',
            password: '1234567'
        });

        const {token} = await fakesUserTokensRespositories.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            const customData = new Date();

            return customData.setHours(customData.getHours() + 3);
        });
        
        
        await expect(resetPassword.execute({
            password: '123123',
            token,
        })).rejects.toBeInstanceOf(AppError);

        
     })
})