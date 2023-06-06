import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { appError } from 'src/common/constants/erros';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly tokenService: TokenService,
        ){}
    

    async registerUser(dto:CreateUserDTO): Promise<AuthUserResponse> {
       try{

        const existUser = await this.userService.findUserByEmail(dto.email);

        if(existUser) throw new BadRequestException(appError.USER_EXIST);

       await this.userService.createUser(dto);
        // Находим пользователя и убираем у него password

        return this.userService.publicUser(dto.email);

       

       }catch(e){

        throw e

       }
    }

    async loginUser(dto:UserLoginDTO): Promise<AuthUserResponse | BadRequestException>{

        try{

        const existUser = await this.userService.findUserByEmail(dto.email);

        if(!existUser) throw new BadRequestException(appError.USER_NOT_EXIST);

        const validatePassword = await bcrypt.compare(dto.password,existUser.password);

        if(!validatePassword) throw new BadRequestException(appError.WRONG_DATA);

        // Находим пользователя и убираем у него password
        return this.userService.publicUser(dto.email);

       
        
       

        }catch(e){
            throw new Error(e)
        }
    }
}
