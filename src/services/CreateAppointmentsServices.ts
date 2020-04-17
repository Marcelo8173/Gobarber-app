import Appoitment from '../models/Appoitments';
import {startOfHour} from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO{
    provider_id: string,
    date: Date, 
}

//Dependecy Inversion

class CreateAppointmentsServices{

    public async execute({ provider_id, date }: RequestDTO): Promise<Appoitment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appoitmentsDate =  startOfHour(date);
        
        const findAppoitmentInSameDate = await appointmentsRepository.findByDate(appoitmentsDate);

        if(findAppoitmentInSameDate){
            throw Error('This appoitment is already booked');
        }

        const appoitment = appointmentsRepository.create({
            provider_id,
            date: appoitmentsDate, //com o DTO eu mando um objeto para criação e não parametros
        });

        await appointmentsRepository.save(appoitment); //salvando no banco de dados

        return appoitment
    }
}

export default CreateAppointmentsServices;