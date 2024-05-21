import { Module } from '@nestjs/common';
import { HelperService } from './helpers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelSettingEntity } from 'src/pixels/pixel-setting.entity';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
    imports: [CacheModule.register({
        ttl: 60, // seconds
        max: 10, // maximum number of items in cache
    }), TypeOrmModule.forFeature([PixelSettingEntity])],
    providers: [HelperService],
    exports: [HelperService]
})
export class HelpersModule { }
