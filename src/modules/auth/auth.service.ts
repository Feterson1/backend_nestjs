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
        private readonly tokenService: TokenService){}
    

    async registerUser(dto:CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if(existUser) throw new BadRequestException(appError.USER_EXIST);

        return this.userService.createUser(dto);
    }

    async loginUser(dto:UserLoginDTO): Promise<AuthUserResponse>{
        const existUser = await this.userService.findUserByEmail(dto.email);

        if(!existUser) throw new BadRequestException(appError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password,existUser.password);

        if(!validatePassword) throw new BadRequestException(appError.WRONG_DATA);
        const token = await this.tokenService.generateJwtToken(dto.email);

        return {...existUser, token};
    }
}
