import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateUserDTO {

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}




export class updateUserDTO{

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    


}

export class updatePasswordDTO{

    

    @ApiProperty()
    @IsString()
    oldPassword: string

    @ApiProperty()
    @IsString()
    newPassword: string

    
}