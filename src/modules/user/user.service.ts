import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/moks';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, updateUserDTO } from './dto';
import { appError } from 'src/common/constants/erros';


@Injectable()
export class UserService {
  

    constructor(@InjectModel(User) private readonly userRepository:typeof User){}

    async hashPassword(password){
        return bcrypt.hash(password, 10);
    }
    async findUserByEmail(email:string){
        return this.userRepository.findOne({
            where:{email:email},
        })
    }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO>{

    dto.password = await this.hashPassword(dto.password);
    const newUser ={
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,

    }
    await this.userRepository.create(newUser);
    return dto;

  }

  async publicUser(email:string){

    return this.userRepository.findOne(
        {
            where:{email: email},
            attributes:{exclude: ['password']}
});
  }

  async updateUser(email: string,dto:updateUserDTO): Promise<updateUserDTO> {

    await this.userRepository.update(dto,{where: {email}});

    return dto
     

  }

  async deleteUser(email:string){
    await this.userRepository.destroy({where:{email}})
    return true

  }
}
