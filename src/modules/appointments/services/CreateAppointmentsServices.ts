import Appoitment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CachedProvider/models/ICacheProvider';
import {startOfHour, isBefore, getHours, format} from 'date-fns'
import AppError from '@shared/error/AppError';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface RequestDTO{
    provider_id: string;
    user_id:string;
    date: Date; 
}

//Dependecy Inversion
@injectable()
class CreateAppointmentsServices{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppoitmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository : INotificationsRepository,

        @inject('RedisCacheProvider')
        private cacheProvider: ICacheProvider,    
    ){}

    public async execute({ provider_id, user_id, date }: RequestDTO): Promise<Appoitment>{

        const appoitmentsDate =  startOfHour(date);
       

        //verificando se um ajendamento é anterior a data que atual
        if(isBefore(appoitmentsDate, Date.now())){
            throw new AppError("you can't create an appointment on a past date");
        };

        //não deixando ele criar uma agendamento com ele mesmo
        if(user_id === provider_id){
            throw new AppError("You don't create an appointment with yoursel");
        };

        //não deixand criar uma data antes das 8 e depois das 17
        if(getHours(appoitmentsDate) < 8 || getHours(appoitmentsDate) > 17){
            throw new AppError('You can only create a new appointment between and 8 a.m e 17 p.m')
        }
            
            const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(appoitmentsDate);

        if(findAppoitmentInSameDate){
            throw new AppError('This appoitment is already booked');
        }

        const appoitment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appoitmentsDate, //com o DTO eu mando um objeto para criação e não parametros
        });

        const formated = format(appoitmentsDate, "dd/MM/yyyy 'às' HH:mm'h'")
        
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para ${formated}`
        })

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(appoitmentsDate,
                'yyyy-M-d')}`);

        return appoitment;
    }
}

export default CreateAppointmentsServices;