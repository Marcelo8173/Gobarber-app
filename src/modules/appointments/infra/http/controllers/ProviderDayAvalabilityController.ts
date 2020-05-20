import { Request, Response } from "express";
import { container } from 'tsyringe';
import ProviderDayAvalability from '@modules/appointments/services/ListProviderDayAvailableService';


export default class ProviderDayAvalabilityController{
    
    public async index(request: Request, response: Response): Promise<Response>{
        const provider_id = request.params.id;
        const { day, mouth, year }  = request.body;

        const listDayAppointment = container.resolve(ProviderDayAvalability); //carregar o service e vai pegar as dependencias dentro do container
        const availability = await listDayAppointment.execute({
            day,
            mouth,
            provider_id,
            year
        });

        return response.json(availability);    
    }
}