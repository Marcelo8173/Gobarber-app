import express, {Response, Request, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes';

import cors from 'cors';
import 'reflect-metadata'; 
import "@shared/infra/typeorm"; 
import uploadConfig from '@config/upload';
import AppError from '@shared/error/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use((err: Error, request:Request, response:Response, next:NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    };

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, () =>{
    console.log('Servidor on em porta 3333')
});