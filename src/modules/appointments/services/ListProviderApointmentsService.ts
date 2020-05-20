import Appointments from '@modules/appointments/infra/typeorm/entities/Appoitments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderApointmentsService{

    constructor(
       @inject('AppointmentsRepository')
       private appointmentsRepository: IAppointmentsRepository,    
    ){}

    public async execute({provider_id, month, year, day}: RequestDTO ): Promise<Appointments[]>{
       const appointments = await this.appointmentsRepository.findAllDayFromProvider({
           day,
           month,
           provider_id,
           year,
       });
       
       return appointments;
        
    }
}

export default ListProviderApointmentsService;