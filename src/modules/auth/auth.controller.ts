import { Body, Controller, Get, Post ,Req,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserService } from '../user/user.service';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService : UserService,
        
        ){}

    @ApiTags('API')
    @Post('register')
    @ApiResponse({
        status: 201,
        type: AuthUserResponse,
    })
    register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse>{
        return this.authService.registerUser(dto);
    }

    @ApiTags('API')
    @ApiResponse({
        status: 200,
        type: AuthUserResponse,
    })
   
    @Post('login')
    login(@Body() dto:UserLoginDTO):Promise<AuthUserResponse | BadRequestException>{
        return this.authService.loginUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-public-user-info')
    getPublicUserInfo(@Req() request){

        const user = request.user;
        return this.userService.publicUser(user.email);
    }

}

