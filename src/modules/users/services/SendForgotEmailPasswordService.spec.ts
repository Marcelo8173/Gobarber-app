import AppError from '@shared/error/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakesUserTokensRespositories from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotEmailPasswordService';

let fakeUserRepository: FakeUsersRepositories;
let fakesUserTokensRespositories: FakesUserTokensRespositories;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail :SendForgotPasswordEmailService;

//o ideal que o teste não dependa de mais nada, apenas dele
describe('SendForgotPasswordEmail', () =>{
    beforeEach(() =>{
        fakeUserRepository = new FakeUsersRepositories();
        fakeMailProvider = new FakeMailProvider();
        fakesUserTokensRespositories = new FakesUserTokensRespositories();


        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository, 
            fakeMailProvider,
            fakesUserTokensRespositories);
        

    })
   
    it('Should be able to recover the password using the email', async () =>{
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

       await fakeUserRepository.create({
            email: 'jhon@example.com',
            name: 'qualquer nome',
            password: '1234567'
        });

     
        await sendForgotPasswordEmail.execute({
            email: 'jhon@example.com',
        })

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to recover a non-existing user password', async () =>{
        await expect (sendForgotPasswordEmail.execute({
            email: 'jhon@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Should generate a forgot password token', async () =>{
        

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        const generate = jest.spyOn(fakesUserTokensRespositories, 'generate');
        

      const user = await fakeUserRepository.create({
            email: 'jhon@example.com',
            name: 'qualquer nome',
            password: '1234567'
        });

     
        await sendForgotPasswordEmail.execute({
            email: 'jhon@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
        expect(generate).toHaveBeenCalledWith(user.id);

    })
})