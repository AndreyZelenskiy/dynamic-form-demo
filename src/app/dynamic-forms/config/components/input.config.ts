import {FormControlConfig, FormControlConfigOptionalArgs} from './form-control.config';
import {ComponentType} from '../component.type';

export class InputConfig extends FormControlConfig<string> {
  readonly component: ComponentType = ComponentType.INPUT;
  readonly placeholder: string | null;
  readonly label: string | null;

  constructor(name: string,
              value: string,
              args: Partial<InputConfigOptionalParams> = {}) {
    super(name, value, args);
    this.label = args.label || null;
    this.placeholder = args.placeholder || '';
  }
}

export interface InputConfigOptionalParams extends FormControlConfigOptionalArgs {
  label: string;
  placeholder: string;
}
