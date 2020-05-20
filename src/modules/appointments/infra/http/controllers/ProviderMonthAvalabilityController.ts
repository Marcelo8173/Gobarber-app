import { Request, Response } from "express";
import { container } from 'tsyringe';
import ProviderMonthAvalability from '@modules/appointments/services/ListMouthAvailableService';


export default class ProviderMonthAvalabilityController{
    public async index(request: Request, response: Response): Promise<Response>{
        const provider_id = request.params.id;
        const { mouth, year }  = request.body;

        const ListMouthAppointment = container.resolve(ProviderMonthAvalability); //carregar o service e vai pegar as dependencias dentro do container
        const availability = await ListMouthAppointment.execute({
            provider_id,
            mouth,
            year
        });

        return response.json(availability);    
    }
}