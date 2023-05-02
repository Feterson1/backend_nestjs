import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { request } from 'http';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService){}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDTO: WatchListDTO, @Req() request){
        const user = request.user;
        return this.watchlistService.createAsset(user,assetDTO);
    }

    

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId:string, @Req() request):Promise<boolean>{
        const {id} = request.user;
        return this.watchlistService.deleteAsset(id,assetId);
    }
}
