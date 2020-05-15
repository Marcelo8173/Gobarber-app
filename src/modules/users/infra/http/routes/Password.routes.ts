import { Router } from 'express';
import ForgotPassworController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';



const passwordRoutes = Router();

const forgotPassworController = new ForgotPassworController();
const resetPasswordController = new ResetPasswordController();
//rota principal de criar
passwordRoutes.post('/forgot', forgotPassworController.create);
passwordRoutes.post('/reset', resetPasswordController.create);


export default passwordRoutes; 