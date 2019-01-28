import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupComponent} from './components/form-group/form-group.component';
import {InputControlComponent} from './components/input-control/input-control.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DynamicFormControlDirective } from './directives/dynamic-form-control.directive';

@NgModule({
  declarations: [
    FormGroupComponent,
    InputControlComponent,
    DynamicFormControlDirective
  ],
  exports: [
    InputControlComponent,
    FormGroupComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [FormGroupComponent, InputControlComponent]
})
export class DynamicFormsModule {
}
