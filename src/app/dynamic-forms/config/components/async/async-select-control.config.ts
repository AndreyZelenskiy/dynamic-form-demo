import {AsyncFormControlConfig, AsyncFormControlConfigOptionalArgs} from './async-form-control.config';
import {ComponentType} from '../../component.type';
import {Mapper} from '../../../services/mapper-factory';

export class AsyncSelectControlConfig<T> extends AsyncFormControlConfig<T> {
  readonly component = ComponentType.ASYNC_SELECT;

  readonly initialList: Selectable<T>[];

  constructor(name: string, url: string, mapper: Mapper, args: Partial<AsyncSelectControlConfigOptionalArgs<T>> = {}) {
    super(name, url, mapper, args);
    this.initialList = args.initialList;
  }
}

export interface AsyncSelectControlConfigOptionalArgs<T> extends AsyncFormControlConfigOptionalArgs<T> {
  initialList: Selectable<T>[];
}

export interface Selectable<T> {
  value: T;
  label: string;
}
