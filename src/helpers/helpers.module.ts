import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersService } from 'src/helpers/helpers.service';
import { PixelSettingEntity } from 'src/pixels/pixel-setting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PixelSettingEntity])],
    providers: [HelpersService],
    exports: [HelpersService]
})

export class HelpersModule {}
