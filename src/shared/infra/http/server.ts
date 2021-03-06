import 'reflect-metadata'; 
import 'dotenv/config';
import express, {Response, Request, NextFunction} from 'express';
import '@shared/container';

import 'express-async-errors';
import uploadConfig from '@config/upload';
import rateLimit from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';

import cors from 'cors';
import { errors} from 'celebrate';
import "@shared/infra/typeorm"; 
import AppError from '@shared/error/AppError';

const app = express();

app.use(rateLimit);
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

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