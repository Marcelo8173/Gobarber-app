import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import IAppoitmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitments from '@modules/appointments/dtos/ICreateAppointments';
//as funçoes que vão mexer com os dados

class  AppointmentsRepository implements IAppoitmentsRepositories{   

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(
          appointment => isEqual(appointment.date, date),
      )

      return findAppointment;
    };
    
    public async create({ date, provider_id}:ICreateAppoitments): Promise<Appointment>{
        
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, provider_id });

        this.appointments.push(appointment);
        
        return appointment;
    }

}

export default AppointmentsRepository;