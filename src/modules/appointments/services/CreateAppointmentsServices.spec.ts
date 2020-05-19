import AppError from '@shared/error/AppError';
import FakeAppointmentsRepositories from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentsServices from './CreateAppointmentsServices';

//o ideal que o teste não dependa de mais nada, apenas dele
describe('CreateAppointments', () =>{
   
    it('Should be able to create a new appointment', async () =>{

        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
        const appointment = await createAppointments.execute({
            user_id: '123123',
            date: new Date(),
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
            user_id: '123123',
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(createAppointments.execute({
            user_id: '123123',
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError);
    })
})