import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { Response, Request } from "express"
import { environment } from "../config/environment"
import { IContext } from "./auth.middleware"

// export interface IContext {
//     req: Request,
//     res: Response,
//     payload: 
//     {
//         userId: string,
//         role: string
//     }

// };


export const isAdmin: MiddlewareFn<IContext> = ({context }, next) => {

    try {
        const bearerToken = context.req.headers["authorization"];
        

        if (!bearerToken) {
            throw new Error("Unauthorized")
        };
        console.log(context.payload);
    
        if (context.payload.role==="admin") {
            
            const jwt = bearerToken.split(" ")[1];
            const payload = verify(jwt, environment.JWT_SECRET);
            context.payload = payload as any;
        } else {
            throw new Error("Unauthorized")

        }

    }

    catch (e) {
        throw new Error(e)

    }
    return next();

}