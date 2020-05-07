import FakeAppointmentsRepositories from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentsServices from './CreateAppointmentsServices';

//o ideal que o teste não dependa de mais nada, apenas dele
describe('Create Appointments', () =>{
   
    it('Should be able to create a new appointment', async () =>{

        const fakeAppointmentRepository = new FakeAppointmentsRepositories();
        const createAppointments = new CreateAppointmentsServices(fakeAppointmentRepository);
        
        const appointment = await createAppointments.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    })
})