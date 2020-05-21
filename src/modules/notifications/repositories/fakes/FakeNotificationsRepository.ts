import { ObjectID } from 'mongodb';
import Notification from '@modules/notifications/infra/typeorm/schemas/notifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

//as funçoes que vão mexer com os dados

class  FakeNotificationsRepository implements INotificationsRepository {   
//atributos
    private notifications: Notification[] = [];
    
    public async create({content, recipient_id}:ICreateNotificationsDTO): Promise<Notification>{
       const notification =  new Notification();

        Object.assign(notification, {id: new ObjectID(), recipient_id, content});

        this.notifications.push(notification);
       
       
        return notification;
    }

    

}

export default FakeNotificationsRepository;