import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import { getRepository, Repository } from 'typeorm';
import IAppoitmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitments from '@modules/appointments/dtos/ICreateAppointments';
//as funçoes que vão mexer com os dados

class  AppointmentsRepository implements IAppoitmentsRepositories{   
//atributos
    private ormRepository : Repository<Appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }
    //metodo de procurar agendamentos por mesma dada
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppoitment = await this.ormRepository.findOne({
            where: { date }
        })

        return findAppoitment;
    };
    
    public async create({ date, provider_id}:ICreateAppoitments): Promise<Appointment>{
        const appointment = this.ormRepository.create({
            provider_id,
            date,
        });
        
        await this.ormRepository.save(appointment); //salvando no banco de dados

        return appointment;
    }

}

export default AppointmentsRepository;