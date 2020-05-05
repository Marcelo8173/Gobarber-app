import Appoitment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import { inject, injectable } from 'tsyringe';
import {startOfHour} from 'date-fns'
import AppError from '@shared/error/AppError';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface RequestDTO{
    provider_id: string,
    date: Date, 
}

//Dependecy Inversion
@injectable()
class CreateAppointmentsServices{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppoitmentsRepository
    ){}

    public async execute({ provider_id, date }: RequestDTO): Promise<Appoitment>{

        const appoitmentsDate =  startOfHour(date);
        
        const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(appoitmentsDate);

        if(findAppoitmentInSameDate){
            throw new AppError('This appoitment is already booked');
        }

        const appoitment = await this.appointmentsRepository.create({
            provider_id,
            date: appoitmentsDate, //com o DTO eu mando um objeto para criação e não parametros
        });


        return appoitment
    }
}

export default CreateAppointmentsServices;