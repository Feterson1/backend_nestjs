import {Body, Controller, Delete, Patch, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, updateUserDTO } from './dto';
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
    
        
        return this.userService.updateUser(user.email,updateDTO);

    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request):Promise<boolean> {
        const user = request.user;
        return this.userService.deleteUser(user.email)

    }

    
   
}

