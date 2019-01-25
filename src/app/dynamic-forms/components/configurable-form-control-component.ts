import {ControlValueAccessor} from '@angular/forms';
import {FormControlConfig} from '../config/components';

export interface ConfigurableFormControlComponent<T> extends ControlValueAccessor {
  /**
   * Should be marked as {@link InputDecorator}
   * Optional because of this components will be created with a {@link ComponentFactoryResolver}
   * It's impossible to create it and set input in the same time
   * https://stackoverflow.com/questions/39280057/how-do-you-use-input-with-components-created-with-a-componentfactoryresolver
   *
   */
  config: FormControlConfig<T> | null;
}
