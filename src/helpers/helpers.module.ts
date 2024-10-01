import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { PixelSettingEntity } from '../pixels/pixel-setting.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PixelSettingEntity]),
        CacheModule.register({
            isGlobal: true,
            ttl: 60, // seconds
            max: 10, // maximum number of items in cache
        })
    ],
    providers: [HelpersService],
    exports: [HelpersService]
})
export class HelpersModule { }