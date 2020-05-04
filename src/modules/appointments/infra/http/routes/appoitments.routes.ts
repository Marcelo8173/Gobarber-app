import { Router, request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import {parseISO} from 'date-fns';
import  AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';

import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';

const appointmentsRouter = Router();

//Rota: receber uma requisição, chamar outro arquivo e devolver uma resposta

appointmentsRouter.use(ensureAthentication);

//rota principal de listar
appointmentsRouter.get('/', async (request,response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appoitments = await appointmentsRepository.find();
    return response.json(appoitments)
})

//rota principal de criar
appointmentsRouter.post('/', async (request, response) =>{
    
        const { provider_id, date } = request.body;

    //o que não é transformação fica dentro da rota
    // as regras de negocio vão para o service 
        const parseDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentsServices();
        const appoitment = await createAppointment.execute({ date: parseDate , provider_id });

        return response.json(appoitment);    
})


export default appointmentsRouter;