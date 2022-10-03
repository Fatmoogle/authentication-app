import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();    // options can be passed in super here
    }

    // This is called by the strategy automatically. 
    // As you can see, we don't call this anywhere ourselves
    // local strategy automatically calls this function,
    // and local strategy is ONLY username and password
    async validate(username: string, password: string): Promise<any> {
        console.log("VALIDATE in Local Strategy Called")
        const user = await this.authService.validateUser(username, password);

        if(!user) {
            throw new UnauthorizedException();
        }

        console.log("User: ", user)
        return user;    // User gets passed into login function

        // Once this runs and you are validated,
        // the request continues and the actual login function
        // we created is ran
    }
}