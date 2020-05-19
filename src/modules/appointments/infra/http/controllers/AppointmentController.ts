import { Request, Response } from "express";
import {parseISO} from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';


export default class AppointmentController{
    public async create(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const { provider_id,date } = request.body;

    //o que não é transformação fica dentro da rota
    // as regras de negocio vão para o service 
        const parseDate = parseISO(date);
        

        const createAppointment = container.resolve(CreateAppointmentsServices); //carregar o service e vai pegar as dependencias dentro do container
        const appoitment = await createAppointment.execute({ date: parseDate, user_id, provider_id });

        return response.json(appoitment);    
    }
}