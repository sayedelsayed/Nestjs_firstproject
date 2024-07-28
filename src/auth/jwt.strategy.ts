// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { UserRepository } from "./user.repository";
// import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "./user.entity";
// import { JwtPayLoad } from "./jwt-payload.interface";


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy){

//     constructor(
//         @InjectRepository(User)
//         private userRepository:UserRepository)
//         {
//             super({
//                 secretOrKey:'toSecret51',
//                 jwtFromRequst:ExtractJwt.fromAuthHeaderAsBearerToken()  
//             })
//         }

//         async validate(payload:JwtPayLoad): Promise <User>{
//             const {username}=payload;
//             const user:User=await this.userRepository.findOne({
//                 where: { username }
//          })

//          if(!user){throw new UnauthorizedException()}
//          return user;
//         }
// }


import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {  JwtPayLoad} from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
    //private configService: ConfigService,
  ) {
    super({
      secretOrKey:'toSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

     async validate(payload:JwtPayLoad): Promise <User>{
            const {username}=payload;
            const user:User=await this.usersRepository.findOne({
                where: { username }
         })

         if(!user){throw new UnauthorizedException()}
         return user;
        }
}


