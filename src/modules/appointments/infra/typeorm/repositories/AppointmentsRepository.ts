import Appointment from '@modules/appointments/infra/typeorm/entities/Appoitments';
import { getRepository, Repository, Raw } from 'typeorm';
import IAppoitmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitments from '@modules/appointments/dtos/ICreateAppointments';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';

//as funçoes que vão mexer com os dados

class  AppointmentsRepository implements IAppoitmentsRepositories{   
//atributos
    private ormRepository : Repository<Appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }
    //metodo de procurar agendamentos por mesma dada
    public async finAllInMonthFromProvider( {provider_id, mouth, year} :IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{
       const parsedMouth = String(mouth).padStart(2, '0');
       
        const appointment = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMouth}-${year}'`,
                )
            }
        });
        

        return appointment;
    }

    public async findAllDayFromProvider( {provider_id, month, day, year} :IFindAllDayFromProviderDTO): Promise<Appointment[]>{
        
        const parsedDay = String(day).padStart(2, '0');
        const parsedMouth = String(month).padStart(2, '0');
        
         const appointment = await this.ormRepository.find({
             where: {
                 provider_id,
                 date: Raw(dateFieldName =>
                     `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMouth}-${year}'`,
                 )
             }
         });
         
 
         return appointment;
     }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppoitment = await this.ormRepository.findOne({
            where: { date }
        })

        return findAppoitment;
    };
    
    public async create({ date, user_id ,provider_id}:ICreateAppoitments): Promise<Appointment>{
        const appointment = await this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });
        
        await this.ormRepository.save(appointment); //salvando no banco de dados

        return appointment;
    }

    

}

export default AppointmentsRepository;