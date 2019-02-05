import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupComponent} from './components/form-group/form-group.component';
import {InputControlComponent} from './components/input-control/input-control.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DynamicFormControlDirective } from './directives/dynamic-form-control.directive';
import { TextareaControlComponent } from './components/textarea-control/textarea-control.component';
import { AsyncSelectControlComponent } from './components/async-select-control/async-select-control.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    FormGroupComponent,
    InputControlComponent,
    DynamicFormControlDirective,
    TextareaControlComponent,
    AsyncSelectControlComponent
  ],
  exports: [
    FormGroupComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [FormGroupComponent, InputControlComponent, TextareaControlComponent, AsyncSelectControlComponent]
})
export class DynamicFormsModule {
}
