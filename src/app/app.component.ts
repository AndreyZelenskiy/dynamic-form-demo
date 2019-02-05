import {Component} from '@angular/core';
import {InputConfig, TextareaConfig} from './dynamic-forms/config/components';
import {FormGroupConfig} from './dynamic-forms/config/groups';
import {ValidatorFactory, ValidatorType} from './dynamic-forms/config/validators';
import {AsyncSelectControlConfig} from './dynamic-forms/config/components/async/async-select-control.config';
import {Mapper} from './dynamic-forms/services/mapper-factory';

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
      ValidatorFactory.syncValidator(ValidatorType.REQUIRED),
      ValidatorFactory.syncValidator(ValidatorType.MAX_LENGTH, {maxLength: 12})
    ];
    const test = new InputConfig('test-input', this.title, {placeholder: 'Test', label: 'Test label', validators});
    const secondTest = new InputConfig('second-test-input', '');
    const testTextarea = new TextareaConfig('test-textarea', 'Test text', {
      id: 'test',
      placeholder: 'Test placeholder',
      columns: 150,
      rows: 5,
      label: 'Test'
    });
    const countrySelectConfig = new AsyncSelectControlConfig<any>('countries', 'https://restcountries.eu/rest/v2/all', Mapper.Country);
    this.config = new FormGroupConfig([test, secondTest, testTextarea, countrySelectConfig]);
  }

  valueChange(e) {
    console.log(e);
  }
}
