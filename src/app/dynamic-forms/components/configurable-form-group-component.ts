import {DynamicFormConfig} from '../config';
import {Observable} from 'rxjs';

/**
 * Component interface for working with every {@link DynamicFormConfig} in the same way
 * Was inspired by {@see FormGroup}
 */
export interface ConfigurableFormGroupComponent {
  /**
   * Should be marked with a {@link InputDecorator}
   */
  config: DynamicFormConfig;

  /**
   * Should be marked with a {@link OutputDecorator}
   */
  statusChange: Observable<FormStatus>;

  /**
   * Emmit every time when form value change
   * Type of value depends from a form config
   * Has a same behaviour as {@see AbstractControl.valueChanges}
   *
   * Should be marked with a {@link OutputDecorator}
   */
  valueChange: Observable<any>;
}

/**
 * For a easier work with angular form status {@see AbstractControl.status}
 */
export enum FormStatus {
  VALID = 'VALID',
  INVALID = 'INVALID'
}
