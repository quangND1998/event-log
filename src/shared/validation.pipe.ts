import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Logger, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass,plainToInstance } from 'class-transformer';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    async transform(value: any, metadata: ArgumentMetadata) {
        // if (value instanceof Object && this.isEmpty(value)) {
        //     throw new HttpException('Validation failed : No body submitted', HttpStatus.BAD_REQUEST)
        // }

        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const formattedErrors = errors.map(err => ({
                field: err.property,
                errors: Object.values(err.constraints),
            }));
            throw new UnprocessableEntityException(formattedErrors);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }


    private formatErrors(errors: any[]) {
        return errors.map(err => {
            for (let property in err.constraints) {
                return err.constraints[property]

            }
        }).join(', ')
    }
    private isEmpty(value: any) {
        if (Object.keys(value).length > 0) {
            return false;
        }
        return true;
    }

}