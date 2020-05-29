import Appointments from '@modules/appointments/infra/typeorm/entities/Appoitments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CachedProvider/models/ICacheProvider';
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

       @inject('RedisCacheProvider')
       private cacheProvider: ICacheProvider,       
    ){}

    public async execute({provider_id, month, year, day}: RequestDTO ): Promise<Appointments[]>{
        
        const caheKey =  `provider-appointments:${provider_id}-${year}-${month}-${day}`;
        
        let appointments = await this.cacheProvider.recover<Appointments[]>(caheKey);
        
        if(!appointments){

        appointments = await this.appointmentsRepository.findAllDayFromProvider({
            day,
            month,
            provider_id,
            year,
        });
        

        await this.cacheProvider.save(
            caheKey, 
            appointments);
        }

       return appointments;
        
    }
}

export default ListProviderApointmentsService;