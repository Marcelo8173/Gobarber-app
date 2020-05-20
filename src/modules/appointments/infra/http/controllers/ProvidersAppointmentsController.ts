import { Request, Response } from "express";
import { container } from 'tsyringe';
import ListProviderApointmentsService from '@modules/appointments/services/ListProviderApointmentsService';


export default class ProvidersAppointmentController{
    public async index(request: Request, response: Response): Promise<Response>{
        const provider_id = request.user.id;
        const { day, month, year} = request.body;

    

        const listProviderApointment = container.resolve(ListProviderApointmentsService); //carregar o service e vai pegar as dependencias dentro do container
        const appoitments = await listProviderApointment.execute({
            day,
            month,
            provider_id,
            year
        });

        return response.json(appoitments);    
    }
}