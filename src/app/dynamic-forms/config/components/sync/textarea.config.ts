import {ComponentType} from '../../component.type';
import {InputConfig, InputConfigOptionalParams} from './input.config';

export class TextareaConfig extends InputConfig {
  readonly component: ComponentType = ComponentType.TEXTAREA;
  readonly rows: number;
  readonly columns: number;

  constructor(name: string, value: string, args: Partial<TextareaConfigOptionalParams> = {}) {
    super(name, value, args);
    this.rows = args.rows || 1;
    this.columns = args.columns || 1;
  }
}

export interface TextareaConfigOptionalParams extends InputConfigOptionalParams {
  rows: number;
  columns: number;
}
