import { Router, request, response } from 'express';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentController';


import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
//Rota: receber uma requisição, chamar outro arquivo e devolver uma resposta 

appointmentsRouter.use(ensureAthentication);

//rota principal de listar
// appointmentsRouter.get('/', async (request,response) =>{
//     const appoitments = await appointmentsRepository.find();
//     return response.json(appoitments)
// });

//rota principal de criar
appointmentsRouter.post('/',appointmentsController.create)


export default appointmentsRouter;