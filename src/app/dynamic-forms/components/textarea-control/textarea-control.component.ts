import {Component, Input, OnInit} from '@angular/core';
import {ConfigurableFormControlComponent} from '../configurable-form-control-component';
import {TextareaConfig} from '../../config/components';

@Component({
  selector: 'app-textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.css']
})
export class TextareaControlComponent implements ConfigurableFormControlComponent<string>, OnInit {
  @Input() config: TextareaConfig | null;
  value: string;
  isDisabled: boolean;
  onChange?: (v: string) => void;
  onTouch?: () => void;

  ngOnInit(): void {
    if (this.config) {
      this.value = this.config.value;
      this.isDisabled = this.config.disabled;
    }
  }

  change(event) {
    this.writeValue(event.target.value);
    if (this.onChange !== undefined) {
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }


}
