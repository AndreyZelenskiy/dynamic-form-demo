import {DynamicFormValidator} from './dynamic-form.validator';
import {AsyncValidatorFn} from '@angular/forms';

export class AsyncValidator extends DynamicFormValidator {

  constructor(public readonly validator: AsyncValidatorFn, key: string, errorMessage: string) {
    super(validator, key, errorMessage);
  }
}

export function isAsyncValidator(validator: DynamicFormValidator): validator is AsyncValidator {
  return validator instanceof AsyncValidator;
}
