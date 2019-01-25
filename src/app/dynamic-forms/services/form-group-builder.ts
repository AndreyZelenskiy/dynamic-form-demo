import {FormGroupConfig} from '../config/groups';
import {FormControlConfig, isFormControlConfig} from '../config/components';
import {FormControl, FormGroup} from '@angular/forms';
import {DynamicFormValidator, isAsyncValidator, isSyncValidator} from '../config/validators';

export function buildFormGroup(config: FormGroupConfig): FormGroup {
  const group = new FormGroup({});
  buildFormGroupControls(group, config);
  return group;
}

export function buildFormControl<T>(config: FormControlConfig<T>): FormControl {
  const control = new FormControl({value: config.value, disabled: config.disabled});
  buildValidators(control, config.validators);
  buildErrors(control, config.validators);
  return control;
}

function buildFormGroupControls(group: FormGroup, config: FormGroupConfig): void {
  const formControlChildren = config.children.filter(isFormControlConfig);
  formControlChildren.map(control => {
    control.parentForm = group;
    return {
      name: control.name,
      control: buildFormControl(control)
    };
  }).forEach(v => group.addControl(v.name, v.control));
}


function buildErrors(control: FormControl, validators: DynamicFormValidator[]) {
  if (validators.length !== 0) {
    const errors = validators.reduce((dict, validator) => {
      dict[validator.key] = validator.errorMessage;
      return dict;
    }, {});
    control.setErrors(errors);
  }

}

function buildValidators(control: FormControl, formValidators: DynamicFormValidator[]): void {
  const validators = formValidators.filter(isSyncValidator).map(v => v.validator);
  const asyncValidators = formValidators.filter(isAsyncValidator).map(v => v.validator);
  if (validators.length !== 0) {
    control.setValidators(validators);
  }
  if (asyncValidators.length !== 0) {
    control.setAsyncValidators(asyncValidators);
  }
}
