import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/Auth';

interface TokenPayLoad{
    iat: number,
    exp: number,
    sub: string
}

export default function ensureAthentication(request: Request, 
    response: Response, 
    netx: NextFunction): void {
    
    const authHeader = request.headers.authorization;
    

    if(!authHeader){
        throw new Error('token is missing');
    };


    const [,token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        //forçanco o tipo de uma variavel 
        const { sub } = decoded as TokenPayLoad;
        request.user = {
            id: sub,
        };
        
        return netx();
    } catch (err) {
        throw new Error('Invalid token jwt');
    }
}