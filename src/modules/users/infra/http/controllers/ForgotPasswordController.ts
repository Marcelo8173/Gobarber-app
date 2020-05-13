import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotEmailPasswordService from '@modules/users/services/SendForgotEmailPasswordService';
//index, show, create, update, delete


export default class ForgotPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email} = request.body;
        //
 
        const sendForgotEmailPasswordService = container.resolve(SendForgotEmailPasswordService);
 
      await sendForgotEmailPasswordService.execute({
             email
         })
 
 
         return response.status(204).json();
    }
}