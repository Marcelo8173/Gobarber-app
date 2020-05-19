import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate } from 'date-fns';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Index } from 'typeorm';

interface RequestDTO{
    provider_id: string;
    mouth: number;
    year: number;
}

//declarando um interface como um array
type IResponse = Array<{
    day: number;
    available: boolean;
}>

@injectable()
class ListMouthAvailableService{

    constructor(
       @inject('AppointmentsRepository')
       private appointmentsRepository: IAppointmentsRepository,    
    ){}

    public async execute({provider_id, mouth, year}: RequestDTO ): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.finAllInMonthFromProvider({
            provider_id,
            year,
            mouth
        })

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, mouth -1));
        
        const eachDayArray = Array.from(
            {length: numberOfDaysInMonth}, 
            (_, Index) => Index +1 );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment =>{
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: appointmentsInDay.length <10,
            }
        })


        return availability;
    }
}

export default ListMouthAvailableService