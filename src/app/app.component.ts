import { Component } from '@angular/core';
import {InputConfig} from './dynamic-forms/config/components';
import {FormGroupConfig} from './dynamic-forms/config/groups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-froms-demo';
  config: FormGroupConfig;

  constructor() {
    const test = new InputConfig('test-input', this.title, {placeholder: 'Test', label: 'Test label'});
    const secondTest = new InputConfig('second-test-input', '');
    this.config = new FormGroupConfig([test, secondTest]);
  }
}
