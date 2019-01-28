import {Component} from '@angular/core';
import {InputConfig} from './dynamic-forms/config/components';
import {FormGroupConfig} from './dynamic-forms/config/groups';
import {SyncValidator} from './dynamic-forms/config/validators';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-froms-demo';
  config: FormGroupConfig;

  constructor() {
    const validators = [
      new SyncValidator(Validators.required, 'required', 'Please provide a value'),
      new SyncValidator(Validators.maxLength(12), 'maxLength', 'Please enter a string less that 12 symbols')
    ];
    const test = new InputConfig('test-input', this.title, {placeholder: 'Test', label: 'Test label', validators});
    const secondTest = new InputConfig('second-test-input', '');
    this.config = new FormGroupConfig([test, secondTest]);
  }
}
