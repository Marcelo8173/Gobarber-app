import { Router, request, response } from 'express';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProvidersAppointmentsController from '@modules/appointments/infra/http/controllers/ProvidersAppointmentsController';


import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();
//Rota: receber uma requisição, chamar outro arquivo e devolver uma resposta 

appointmentsRouter.use(ensureAthentication);

//rota principal de listar
// appointmentsRouter.get('/', async (request,response) =>{
//     const appoitments = await appointmentsRepository.find();
//     return response.json(appoitments)
// });

//rota principal de criar
appointmentsRouter.post('/',appointmentsController.create);
appointmentsRouter.get('/me',providersAppointmentsController.index);


export default appointmentsRouter;