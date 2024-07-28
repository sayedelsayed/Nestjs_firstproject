import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredetialsDto } from './dto/auth-credetials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(User)
        private userRepository:UserRepository,
         private jwtService:JwtService   ){}

        async creatUser(authCredetialsDto:AuthCredetialsDto): Promise<void>{
            const {username , password}=authCredetialsDto;
            const salt=await bcrypt.genSalt();
            const hashedPassword=await bcrypt.hash(password,salt);
            const user= this.userRepository.create({username,password:hashedPassword});
            try
            {
                await this.userRepository.save(user);
            }
            catch(error){
               
                if(error.code==='23505'){
                    throw new ConflictException('UserName already exists');
                }
                //"password":"Sayed22Seka"
                else{
                    throw new InternalServerErrorException();
                }
            }
            
        //console.log(user);
        }


        async signIn(authCredetialsDto:AuthCredetialsDto): Promise<{accessToken:string}>
        {   
            const {username , password}=authCredetialsDto;
            const user =await this.userRepository.findOne({
                where: { username }
         })

         if(user && (await bcrypt.compare(password,user.password) ))
            {
            const payload:JwtPayLoad={username};
            const accessToken :string=await this.jwtService.sign(payload);
            return {accessToken};
            }
         else
         {throw new  UnauthorizedException( 'pleas check your logain credentials');}
        }  

}

