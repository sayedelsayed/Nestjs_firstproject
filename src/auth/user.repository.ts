import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredetialsDto } from "./dto/auth-credetials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    // async creatUser(authCredetialsDto:AuthCredetialsDto): Promise<void>{
    //     const {username , password}=authCredetialsDto;

    //     const user= this.create({username,password});
    //     await this.save(user);    }
}