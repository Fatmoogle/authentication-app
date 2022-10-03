import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
            private usersService: UsersService,
            private jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string): Promise<any> {
        console.log("VALIDATE USER called in auth service")
        // Gets a user if there is a match from the request
        const user = await this.usersService.findOne(username);

        // If user exists and password matches, return id and name from the user only
        if(user && user.password === password) {
            const { password, username, ...rest } = user;   // spread will return id and name
            return rest;    // You dont want to return password in most cases
        }

        // if no one found or password doesnt match, return null
        return null;
    }

    // Once the guard runs validateUser above, the guard is finished.
    // A user has been returned and is passed into this function.
    // sub is the subject, or ID typically of the JWT (the user)
    // user is being returned by the validate function in local strategy
    async login(user: any) {
        console.log("Login function in auth service called")
        
        console.log("User in the login function", user)
        // ^^ this log shows we just get Id and name, not whole user

        // comes from the request
        const payload = { name: user.name, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload)
            // sign will take the payload and the secret and 
            // create an access token from it and send to client
        }
    }
}

// Check out https://jwt.io/ to see what a JWT consists of