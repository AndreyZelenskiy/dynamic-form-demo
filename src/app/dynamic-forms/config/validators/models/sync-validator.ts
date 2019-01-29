import {DynamicFormValidator} from './dynamic-form.validator';
import {ValidatorFn} from '@angular/forms';

export class SyncValidator extends DynamicFormValidator {
  readonly type = 'sync';

  constructor(public readonly validator: ValidatorFn, key: string, errorMessage: string) {
    super(validator, key, errorMessage);
  }
}

export function isSyncValidator(validator: DynamicFormValidator): validator is SyncValidator {
  return validator instanceof SyncValidator;
}
