 
import { AuthChecker } from "type-graphql";
import { User } from "../entity/user.entity";
import {AccessLevels} from "../user/user.types"



export const authChecker: AuthChecker <{ user: User | null }, AccessLevels>  = ({ context: { user } }, roles) => {

    if (roles.length === 0) {
        console.log()
        // if `@Authorized()`, check only if user exists
        return user !== undefined;
      }
      // there are some roles defined now
    
      if (!user) {
        // and if no user, restrict access
        return false;
      }
      if (user.role.some(role => roles.includes("admin"))) {
        // grant access if the roles overlap
        return true;
      }
    
      // no roles matched, restrict access
      return false;
    };




 


