import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';

export abstract class DynamicFormValidator {
  protected constructor(
    public readonly validator: ValidatorFn | AsyncValidatorFn,
    public readonly key: string,
    public readonly errorMessage: string) {
  }
}
