import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import { Repository, EntityRepository } from 'typeorm';
//as funçoes que vão mexer com os dados

@EntityRepository(Appointment)
class  AppointmentsRepository extends Repository<Appointment>{   
//atributos
 
    //metodo de procurar agendamentos por mesma dada
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppoitment = await this.findOne({
            where: { date }
        })

        return findAppoitment || null;
    }
    

}

export default AppointmentsRepository;