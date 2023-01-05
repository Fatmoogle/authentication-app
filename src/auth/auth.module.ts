import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'SECRET', // THIS WILL BE IN ENV, should never be exposed
    signOptions: { expiresIn: '60s' } 
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]  // export authservice so app controller can use
})
export class AuthModule {}

// The secret is what is used to "sign" a JWT.
// The signature will be the servers way of telling
// if a JWT is legitimate and not tampered with.
// It helps determine if JWT is from your server or someone elses 
