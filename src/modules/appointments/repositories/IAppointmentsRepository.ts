import Appoitments from '@modules/appointments/infra/typeorm/entities/Appoitments';
import ICreateAppoitmentsDTO from '@modules/appointments/dtos/ICreateAppointments';

export default interface IAppoitmentsRepositories{
    create(data: ICreateAppoitmentsDTO): Promise<Appoitments>; 
    findByDate(date: Date): Promise<Appoitments | undefined>;
}