import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[SequelizeModule.forFeature([User,Watchlist]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
