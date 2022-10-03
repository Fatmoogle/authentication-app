import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// 'jwt' tells passport what strategy we will use
// This will trigger the JWT strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

}