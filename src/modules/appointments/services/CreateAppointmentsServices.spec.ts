import AppError from '@shared/error/AppError';
import FakeAppointmentsRepositories from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentsServices from './CreateAppointmentsServices';
import { getTime } from 'date-fns';

//o ideal que o teste não dependa de mais nada, apenas dele
describe('CreateAppointments', () =>{
   
    it('Should be able to create a new appointment', async () =>{

        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 10, 12).getTime();
        });


        const appointment = await createAppointments.execute({
            user_id: '123112323',
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    })

    it('Should not be able to create two appointments on the same time', async () =>{
        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
        const appointmentDate = new Date(2020, 5,10,11);

        await createAppointments.execute({
            user_id: '1231231123',
            date: appointmentDate,
            provider_id: '123123',
        });

        await expect(createAppointments.execute({
            user_id: '1231231123',
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError);
    })

    it('Should not be able to create an appointments on a past date', async () =>{
        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
       jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
           return new Date(2020, 4, 10, 12).getTime();
       });

       await expect(
           createAppointments.execute({
               provider_id: '12121',
               user_id: '123123123',
               date: new Date(2020, 4, 10, 11)
           })
       ).rejects.toBeInstanceOf(AppError);
    })

    it('Should not be able to create an appointment with same user as provider', async () =>{
        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
       jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
           return new Date(2020, 4, 10, 12).getTime();
       });

       
       await expect(
           createAppointments.execute({
               provider_id: 'user_id',
               user_id: 'user_id',
               date: new Date(2020, 4, 10, 11)
           })
       ).rejects.toBeInstanceOf(AppError);
    })

    it('Should not be able to create an appointment before the 8 a.m and after 17 p.m', async () =>{
        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
       jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
           return new Date(2020, 4, 10, 12).getTime();
       });

       
       await expect(
           createAppointments.execute({
               provider_id: 'provider_id',
               user_id: 'user_id',
               date: new Date(2020, 4, 10, 7)
           })
       ).rejects.toBeInstanceOf(AppError);

       await expect(
        createAppointments.execute({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 10, 18)
        })
    ).rejects.toBeInstanceOf(AppError);
    
    })
})