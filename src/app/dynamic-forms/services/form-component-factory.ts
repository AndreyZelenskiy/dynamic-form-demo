import {ComponentFactory, ComponentFactoryResolver, Injectable, Type} from '@angular/core';
import {ComponentType, FormControlConfig} from '../config';
import {InputControlComponent} from '../components/input-control/input-control.component';
import {FormGroupComponent} from '../components/form-group/form-group.component';

@Injectable({providedIn: 'root'})
export class FormControlComponentFactory {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  getFormControlComponentFactory<T>(config: FormControlConfig<T>): ComponentFactory<Components> {
    return this.resolver.resolveComponentFactory<Components>(this.getComponentClass(config.component));
  }

  private getComponentClass(type: ComponentType): Type<Components> {
    switch (type) {
      case ComponentType.INPUT:
        return InputControlComponent;
      case ComponentType.FORM_GROUP:
        return FormGroupComponent;
      default:
        throw Error(`Couldn't find a Component for a ${type} type`);
    }
  }
}

export type Components = InputControlComponent | FormGroupComponent;
