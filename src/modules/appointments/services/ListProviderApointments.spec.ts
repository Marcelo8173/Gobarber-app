import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListProviderApointmentsService from "@modules/appointments/services/ListProviderApointmentsService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderApointments: ListProviderApointmentsService;

describe('ListProviderApointmentsService', ()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderApointments = new ListProviderApointmentsService(fakeAppointmentsRepository);
    })

   it('Should be able to list the appointments on a specific day', async () =>{
    
       const appointments1 =  await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'provider',
        })

        const appointments2 = await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'provider',
        })

        const appointments = await listProviderApointments.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        })
        
      

       expect(appointments).toEqual([appointments1, appointments2])
   })
})
