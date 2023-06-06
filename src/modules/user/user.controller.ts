import {Body, Controller, Delete, Get, Patch, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, updatePasswordDTO, updateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @ApiTags('API')
    @ApiResponse({status:200, type:updateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDTO: updateUserDTO, @Req() request): Promise<updateUserDTO> {

        const user = request.user;
    
        
        return this.userService.updateUser(user.id,updateDTO);

    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request):Promise<boolean> {
        const user = request.user;
        return this.userService.deleteUser(user.email)

    }

    @ApiTags('API')
    @ApiResponse({status:200})
    @UseGuards(JwtAuthGuard)
    @Get('change-password')
    updatePassword(@Body() updatePasswordDTO: updatePasswordDTO, @Req() request): Promise<updatePasswordDTO> {

        const user = request.user;
    
        
        return this.userService.updatePassword(user.id,updatePasswordDTO);

    }

    
   
}

