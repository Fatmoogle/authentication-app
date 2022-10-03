import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common"

// This strategy is the JWT strategy. Different than 'local'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // Tells how to get access token, which will get it from headers
            secretOrKey: 'SECRET',   // THIS WILL BE IN ENV, DO NOT EXPOSE
            ignoreExpiration: false // If JWT is expired, do not allow access
        }) // to configure strategy, options are passed here
    }

    // Validation happens above. It extracts the jwt from the request,
    // then decodes the payload and passes it down here. So this function
    // will simply return an object
    async validate(payload: any) {
        return {
            id: payload.sub,
            name: payload.name
        };  // Will be saved in req.user
    }
}

// When a protected route is hit, the Guard kicks in, and runs the strategy
// It will try to extract the JWT from the headers of the request. ^^^
