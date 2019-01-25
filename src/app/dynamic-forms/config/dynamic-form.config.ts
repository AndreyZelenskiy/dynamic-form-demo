import {ComponentType} from './component.type';

export abstract class DynamicFormConfig {
  abstract readonly component: ComponentType;
}
