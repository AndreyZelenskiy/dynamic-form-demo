import {SyncValidator} from './models/sync-validator';
import {
  Configurations,
  MaxLengthConfiguration,
  MaxValueConfiguration,
  MinLengthConfiguration,
  MinValueConfiguration,
  ValidatorType
} from './configuration';
import {Validators} from '@angular/forms';

export class ValidatorFactory {
  static syncValidator(type: ValidatorType.REQUIRED): SyncValidator;
  static syncValidator(type: ValidatorType.MIN_LENGTH, configuration: MinLengthConfiguration): SyncValidator;
  static syncValidator(type: ValidatorType.MAX_VALUE, configuration: MaxValueConfiguration): SyncValidator;
  static syncValidator(type: ValidatorType.MIN_VALUE, configuration: MinValueConfiguration): SyncValidator;
  static syncValidator(type: ValidatorType.MAX_LENGTH, configuration: MaxLengthConfiguration): SyncValidator;
  static syncValidator(type: ValidatorType, configuration?: Configurations): SyncValidator {
    switch (type) {
      case ValidatorType.MAX_LENGTH:
        return new SyncValidator(
          Validators.maxLength((configuration as MaxLengthConfiguration).maxLength),
          'maxLength',
          'Please provide a field with a length less than ' + (configuration as MaxLengthConfiguration).maxLength + ' symbols'
        );
      case ValidatorType.MIN_LENGTH:
        return new SyncValidator(
          Validators.minLength((configuration as MinLengthConfiguration).minLength),
          'minLength',
          'Please provide a field with a length more that ' + (configuration as MinLengthConfiguration).minLength + 'symbols'
        );
      case ValidatorType.REQUIRED:
        return new SyncValidator(Validators.required, 'required', 'Please provide a required field');
      case ValidatorType.MIN_VALUE:
        return new SyncValidator(
          Validators.min((configuration as MinValueConfiguration).minValue),
          'min',
          'Please provide a field with a value more that ' + (configuration as MinValueConfiguration).minValue
        );
      case ValidatorType.MAX_VALUE:
        return new SyncValidator(
          Validators.max((configuration as MaxValueConfiguration).maxValue),
          'max',
          'Please provide a field with a value more that ' + (configuration as MaxValueConfiguration).maxValue
        );
      default:
        throw new Error('Couldn\'t find a validator for a type' + type);
    }
  }
}


