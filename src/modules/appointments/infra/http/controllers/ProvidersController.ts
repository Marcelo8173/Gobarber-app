import { Request, Response } from "express";
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointments/services/ListProviderService';


export default class ProviderController{
    public async index(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;        

        const createAppointment = container.resolve(ListProviderService); //carregar o service e vai pegar as dependencias dentro do container
        const appoitment = await createAppointment.execute({
            user_id,
        });

        return response.json(appoitment);    
    }
}