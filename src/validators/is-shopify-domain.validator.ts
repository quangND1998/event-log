import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsShopifyDomain', async: false })
export class IsShopifyDomainConstraint implements ValidatorConstraintInterface {
  validate(shop: string, args: ValidationArguments) {
    if (!shop) return false;
    
    const storeName = shop.split('.myshopify.com')[0];
    
    if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(shop)) {
      console.log('Invalid shop name format:', storeName);
      return false;
    }

    if (storeName.length > 60) {
      console.log('Invalid store name length:', storeName.length);
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid shop name';
  }
}