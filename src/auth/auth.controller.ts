import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredetialsDto } from './dto/auth-credetials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

constructor(private  authService:AuthService){}



    @Post('/signup')
    singUp(@Body() authCredetialsDto:AuthCredetialsDto):Promise<void>{
        return this.authService.creatUser(authCredetialsDto)
    }
    
    @Post('/signin')
    @UseGuards()
    singin(@Body() authCredetialsDto:AuthCredetialsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredetialsDto)
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req ){
    //     console.log(req)
    // }
}
