import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ConfigurableFormControlComponent} from '../configurable-form-control-component';
import {AsyncSelectControlConfig, Selectable} from '../../config/components/async/async-select-control.config';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AsyncFormControlStatus, HttpMethod} from '../../config/components/async';
import {HttpClient} from '@angular/common/http';
import {MapperFactory} from '../../services/mapper-factory';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-async-select-control',
  templateUrl: './async-select-control.component.html',
  styleUrls: ['./async-select-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsyncSelectControlComponent),
      multi: true
    }
  ]
})
export class AsyncSelectControlComponent<T> implements ConfigurableFormControlComponent<T>, OnInit, OnDestroy {
  @Input() config: AsyncSelectControlConfig<T>;

  onChange: (value: T) => void;
  onTouched: () => void;
  isDisabled: boolean;
  value: string;

  list: Selectable<T>[];

  status: AsyncFormControlStatus;
  AsyncFormControlStatus = AsyncFormControlStatus;

  requestSubscription: Subscription;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    if (this.config.status === AsyncFormControlStatus.PENDING && this.requestSubscription === undefined) {
      if (this.config.method === HttpMethod.GET) {
        this.httpClient.get(this.config.url, {params: this.config.params})
          .pipe(
            map((data: Partial<T>[]) => data.map(MapperFactory.getMapper<T, Selectable<T>>(this.config.mapper)))
          ).subscribe(
          (value: Selectable<T>[]) => {
            this.list = value;
            this.status = AsyncFormControlStatus.RESOLVE;
          },
          () => {
            this.status = AsyncFormControlStatus.REJECT;
            this.list = [];
          }
        );
      }
    }
  }

  change(value: any): void {
    const selectedValue = value.target.value;
    const selectable = this.list.find(v => v.label === selectedValue);
    this.writeValue(selectable.value);
    this.onChange(selectable.value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: T): void {
    if (this.list) {
      this.value = this.list.find(v => v.value === obj).label;
    }
  }

  ngOnDestroy(): void {
    if (this.requestSubscription !== undefined && !this.requestSubscription.closed) {
      this.requestSubscription.unsubscribe();
    }
  }
}
