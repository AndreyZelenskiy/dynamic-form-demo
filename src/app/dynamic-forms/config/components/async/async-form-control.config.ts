import {FormControlConfig, FormControlConfigOptionalArgs} from '../sync';
import {Mapper} from '../../../services/mapper-factory';

export abstract class AsyncFormControlConfig<T> extends FormControlConfig<T> {
  public readonly method: HttpMethod;
  public readonly params: { [key: string]: string } | null;
  public readonly status: AsyncFormControlStatus;

  protected constructor(
    name: string,
    public readonly url: string,
    public readonly mapper: Mapper,
    args: Partial<AsyncFormControlConfigOptionalArgs<T>> = {}
  ) {
    super(name, args.initialValue || null, args);
    this.method = args.method || HttpMethod.GET;
    this.params = args.params || null;
    this.status = args.status || AsyncFormControlStatus.PENDING;
  }
}

export interface AsyncFormControlConfigOptionalArgs<T> extends FormControlConfigOptionalArgs {
  initialValue: T | null;
  method: HttpMethod;
  params: { [key: string]: string };
  status: AsyncFormControlStatus;
}

export enum HttpMethod {
  GET = 'GET'
}

export enum AsyncFormControlStatus {
  PENDING = 'PENDING',
  RESOLVE = 'RESOLVE',
  REJECT = 'REJECT'
}
