import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListMouthAvailableService from "@modules/appointments/services/ListMouthAvailableService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMouthAvailable: ListMouthAvailableService;

describe('ListMouthAvailable', ()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listMouthAvailable = new ListMouthAvailableService(fakeAppointmentsRepository);
    })

   it('Should be able to list mouth availability from provider', async () =>{
    
        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 8, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 9, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        
        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 10, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 11, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 12, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 13, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

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

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 16, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 20, 17, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        })


        await fakeAppointmentsRepository.create({
            user_id: 'user',
            date: new Date(2020, 5, 21, 8, 0, 0) , //ano, mes (0 é janeiro), dia, hora
            provider_id: 'user',
        });

        const availability = await listMouthAvailable.execute({
            provider_id: 'user',
            year: 2020,
            mouth: 6
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true },
            { day: 20, available: false },
            { day: 21, available: true },
            { day: 22, available: true },
        ]))
   })
})
