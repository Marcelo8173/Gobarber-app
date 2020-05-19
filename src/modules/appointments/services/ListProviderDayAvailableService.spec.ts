import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListDayAvailableService from "@modules/appointments/services/ListProviderDayAvailableService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailable: ListDayAvailableService;

describe('ListDayAvailable', ()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listDayAvailable = new ListDayAvailableService(fakeAppointmentsRepository);
    })

   it('Should be able to list day availability from provider', async () =>{
    
        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 14, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 15, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            
            return new Date(2020, 4, 20, 11, 0, 0).getTime();
        });

        const availability = await listDayAvailable.execute({
            provider_id: 'user',
            day: 20,
            year: 2020,
            mouth: 6
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
        ]))
   })
})
