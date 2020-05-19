import Appoitments from '@modules/appointments/infra/typeorm/entities/Appoitments';
import ICreateAppoitmentsDTO from '@modules/appointments/dtos/ICreateAppointments';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';



export default interface IAppoitmentsRepositories{
    create(data: ICreateAppoitmentsDTO): Promise<Appoitments>; 
    findByDate(date: Date): Promise<Appoitments | undefined>;
    finAllInMonthFromProvider(data :IFindAllInMonthFromProviderDTO): Promise<Appoitments[]>;
    findAllDayFromProvider( data :IFindAllDayFromProviderDTO): Promise<Appoitments[]>;
}