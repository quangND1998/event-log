import { Injectable, Inject, Get } from '@nestjs/common';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getDayRange } from './../helper';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PixelSettingEntity } from '../pixels/pixel-setting.entity';

const PATH = {
    TZ: 'tz'
}
@Injectable()
export class HelpersService {
    constructor(

        @InjectRepository(PixelSettingEntity)
        private readonly pixelSetingRepository: Repository<PixelSettingEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,

    ) {
    }

    async getFilterDate(shop: string, startDate: Date, endDate: Date): Promise<any> {
        let timezone;
        if (!startDate || !endDate) {
            let tz = await this.cacheManager.get(PATH.TZ);
            if (tz) {
                timezone = tz;
            } else {
                let settings = await this.pixelSetingRepository.find({
                    where: {
                        shop: shop
                    },
                    select: {
                        date_timezone_offset: true
                    },
                });


                if (settings[0]["date_timezone_offset"] != undefined) {
                    let timezone_ = settings[0]["date_timezone_offset"];
                    timezone = timezone_;
                    this.cacheManager.set(PATH.TZ, timezone_);
                }
            }
        }
        let startDate_ = startDate
            ? moment(startDate, "YYYY-MM-DD HH:mm:ss").utcOffset(0, true).toDate()
            : moment().utcOffset(timezone, true).startOf("day").toDate();
        let endDate_ = endDate
            ? moment(endDate, "YYYY-MM-DD HH:mm:ss")
                .utcOffset(0, true)
                .endOf("day")
                .toDate()
            : moment().utcOffset(timezone, true).endOf("day").toDate();
        return { $gte: startDate_, $lt: endDate_ };
    };
    getDayRange(startDate: Date, endDate: Date) {
        let days = [];
        let dateStart = moment(startDate);
        let dateEnd = moment(endDate);

        while (dateEnd.valueOf() > dateStart.valueOf()) {
            days.unshift(dateStart.format("DD_MM_YYYY"));
            dateStart.add(1, "day");
        }
        return days;
    };


    decodeUrl = (url) => {
        try {
            // Replace "+" with space, remove newlines, and trim the string
            let str = url.replace(/\+/g, " ").replace(/\r?\n|\r/g, "").replace(/\\n/g, "").trim();

            for (const [key, value] of Object.entries(ASCII_DECODE_JSON)) {
                const regex = new RegExp(key, "g");
                str = str.replace(regex, value);
            }

            str = decodeURI(str);
            str = str.replace(/\s+/g, " ").trim();

            return str;
        } catch (error) {
            try {
                return decodeURI(url).replace(/\s+/g, " ").trim();
            } catch (error) {
                return url.trim();
            }
        }
    }

    calculatePercentage = (numerator, denominator) => {
        return Math.round((parseInt(denominator) == 0 ? 0 : (parseInt(numerator) / parseInt(denominator)) * 100) * 100) / 100
      }
      
}