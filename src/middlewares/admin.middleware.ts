import {MiddlewareFn} from "type-graphql"
import {verify} from "jsonwebtoken"
import {Response, Request } from "express"
import {environment} from "../config/environment"

export interface IContext {
    req: Request,
    res: Response, 
    payload: {userId: string}
};


export const isAdmin: MiddlewareFn<IContext> = ({context}, next) =>{

    try {
       const adminToken= context.req.headers ["authorization"];

    if (!adminToken) {
        throw new Error ("Unauthorized")
    };

        const jwt= adminToken.split(" ") [1];
        const payload= verify(jwt, environment.JWT_ADMIN);
        context.payload=payload as any;
 
    } catch (e)  {
        throw new Error (e)

    }
    return next();
    
}