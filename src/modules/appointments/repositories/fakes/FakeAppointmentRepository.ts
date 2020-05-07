import { uuid } from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import IAppoitmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitments from '@modules/appointments/dtos/ICreateAppointments';
//as funçoes que vão mexer com os dados

class  AppointmentsRepository implements IAppoitmentsRepositories{   

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(
          appointment => appointment.date === date,
      )

      return findAppointment;
    };
    
    public async create({ date, provider_id}:ICreateAppoitments): Promise<Appointment>{
        
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), provider_id, date});

        this.appointments.push(appointment);
        
        return appointment;
    }

}

export default AppointmentsRepository;