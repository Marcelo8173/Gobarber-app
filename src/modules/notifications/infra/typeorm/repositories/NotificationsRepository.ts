import Notifications from '@modules/notifications/infra/typeorm/schemas/notifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';

//as funçoes que vão mexer com os dados

class  NotificationsRepository implements INotificationsRepository {   
//atributos
    private ormRepository : MongoRepository<Notifications>;

    constructor(){
        this.ormRepository = getMongoRepository(Notifications, 'mongo');
    }
    
    public async create({content, recipient_id}:ICreateNotificationsDTO): Promise<Notifications>{
       const notification =  this.ormRepository.create({
           content,
           recipient_id,
       });


       await this.ormRepository.save(notification);

       return notification;
    }

    

}

export default NotificationsRepository;