import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { environment } from "../config/environment"
import { IContext } from "./auth.middleware"
import {valueRole} from "../resolvers/auth.resolver"





export const isAdmin: MiddlewareFn<IContext> = ({context  }, next) => {



    try {
        const bearerToken = context.req.headers["authorization"];
        

        if (!bearerToken) {
            throw new Error("Unauthorized")
        };
       
    
        if (valueRole==="admin") {
            
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