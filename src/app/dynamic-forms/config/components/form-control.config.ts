import {DynamicFormConfig} from '../dynamic-form.config';
import {DynamicFormValidator} from '../validators';
import {FormGroup, NgForm} from '@angular/forms';

export abstract class FormControlConfig<T> extends DynamicFormConfig {
  readonly validators: DynamicFormValidator[];
  readonly disabled: boolean;
  readonly id: string | null;
  readonly hint: string | null;
  parentForm: FormGroup;

  protected constructor(public readonly name: string, public readonly value: T, args: Partial<FormControlConfigOptionalArgs> = {}) {
    super();
    this.id = args.id || null;
    this.hint = args.hint || null;
    this.disabled = args.disabled || false;
    this.validators = args.validators || [];
  }
}

export interface FormControlConfigOptionalArgs {
  validators: DynamicFormValidator[];
  disabled: boolean;
  id: string | null;
  hint: string | null;
}

export function isFormControlConfig<T>(config: DynamicFormConfig): config is FormControlConfig<T> {
  return config instanceof FormControlConfig;
}
