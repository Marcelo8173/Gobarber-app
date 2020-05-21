import Notifications from "@modules/notifications/infra/typeorm/schemas/notifications";
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

export default interface INotificationsRepository{
    create(date:ICreateNotificationsDTO): Promise<Notifications>;
}