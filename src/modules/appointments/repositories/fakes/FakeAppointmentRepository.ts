import { uuid } from 'uuidv4';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import IAppoitmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitments from '@modules/appointments/dtos/ICreateAppointments';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';


//as funçoes que vão mexer com os dados

class  AppointmentsRepository implements IAppoitmentsRepositories{   

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(
          appointment => isEqual(appointment.date, date),
      )

      return findAppointment;
    };
    
    public async create({ date, user_id, provider_id}:ICreateAppoitments): Promise<Appointment>{
        
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, provider_id, user_id });

        this.appointments.push(appointment);
        
        return appointment;
    }

    public async finAllInMonthFromProvider( {provider_id, mouth, year} :IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{
        const appointment = this.appointments.filter(appointment => {
            return(
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === mouth &&
                getYear(appointment.date) === year
            )
        });
        

        return appointment;
    }

    public async findAllDayFromProvider( {provider_id, day, month, year} :IFindAllDayFromProviderDTO): Promise<Appointment[]>{
        const appointment = this.appointments.filter(appointment => {
            return(
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        });
        
        return appointment;
    }


    

}

export default AppointmentsRepository;