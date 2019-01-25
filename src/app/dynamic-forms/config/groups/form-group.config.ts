import {DynamicFormConfig} from '../dynamic-form.config';
import {ComponentType} from '../component.type';

export class FormGroupConfig extends DynamicFormConfig {
  readonly component = ComponentType.FORM_GROUP;

  constructor(public readonly children: DynamicFormConfig[]) {
    super();
  }
}
