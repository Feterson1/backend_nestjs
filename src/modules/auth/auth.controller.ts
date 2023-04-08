import { Body, Controller, Post ,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiTags('API')
    @Post('register')
    @ApiResponse({
        status: 201,
        type: CreateUserDTO,
    })
    register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO>{
        return this.authService.registerUser(dto);
    }

    @ApiTags('API')
    @ApiResponse({
        status: 200,
        type: AuthUserResponse,
    })
   
    @Post('login')
    login(@Body() dto:UserLoginDTO):Promise<AuthUserResponse>{
        return this.authService.loginUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test(){
        return true;
    }
}
