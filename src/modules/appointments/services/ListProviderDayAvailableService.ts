import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getHours, isAfter } from 'date-fns';

import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    provider_id: string;
    day: number;
    mouth: number;
    year: number;
}

//declarando um interface como um array
type IResponse = Array<{
    hour: number;
    available: boolean;
}>

@injectable()
class ListDayAvailableService{

    constructor(
       @inject('AppointmentsRepository')
       private appointmentsRepository: IAppointmentsRepository,    
    ){}

    public async execute({provider_id, day, mouth, year}: RequestDTO ): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.findAllDayFromProvider({
            provider_id,
            year,
            day,
            month: mouth
        });


        const hourStart = 8;
        const eachHourArray = Array.from({length: 10},
            (_,index) => index + hourStart,
        );
        
        const currentDate = new Date(Date.now()); //pegando a hora exata que se esta verificando o agendamento

        const availability = eachHourArray.map(hour =>{
            const hasAppointmentInHour = appointments.find(appointment =>
                getHours(appointment.date) === hour
                )


            const comapareDate = new Date(year, mouth -1, day, hour); 

            return{
                hour,
                available: !hasAppointmentInHour && isAfter(comapareDate, currentDate),
            }
        })
        


        return availability;
    }
}

export default ListDayAvailableService