import {MiddlewareFn} from "type-graphql"
import {verify} from "jsonwebtoken"
import {Response, Request } from "express"
import {environment} from "../config/environment"
import { User } from "../entity/user.entity"

export interface IContext {
    req: Request,
    res: Response,
    payload: 
    {
        userId: string,
        role: string
    }

};

export const  isAuth: MiddlewareFn<IContext> = ({context}, next) =>{

    try {
       const bearerTokenn= context.req.headers ["authorization"];

    if (!bearerTokenn) {
        throw new Error ("Unauthorized")
    };

        const jwt= bearerTokenn.split(" ") [1];

        const payload= verify(jwt,  environment.JWT_SECRET);
        context.payload=payload as any;

       
        console.log(context.payload)
        // console.log(jwt)
    
 
    } catch (e)  {
        throw new Error (e)

    }
    return next();
    
}