import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ConfigurableFormGroupComponent, FormStatus} from '../configurable-form-group-component';
import {FormGroupConfig, isFormControlConfig} from '../../config';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {buildFormGroup} from '../../services/form-group-builder';
import {FormControlComponentFactory} from '../../services/form-component-factory';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements ConfigurableFormGroupComponent, OnInit, AfterViewInit {
  @Input() config: FormGroupConfig;
  @Output() statusChange: Observable<FormStatus>;
  @Output() valueChange: Observable<any>;

  @ViewChild('form') form: FormGroup;
  @ViewChildren('formField', {read: ViewContainerRef}) fields: QueryList<ViewContainerRef>;

  constructor(private factory: FormControlComponentFactory, private detector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.form = buildFormGroup(this.config);
    console.log(this.form);
    this.form.valueChanges.subscribe(
      (change: any) => {
          console.log('formChange', change);
      });
  }

  ngAfterViewInit(): void {
    this.config.children
      .filter(isFormControlConfig)
      .map((c, idx) => ({config: c, container: this.fields.toArray()[idx]}))
      .forEach(v => {
        const componentFactory = this.factory.getFormControlComponentFactory(v.config);
        const componentRef = v.container.createComponent(componentFactory);
        componentRef.instance.config = <any>v.config;
      });
    this.detector.detectChanges();
  }

}
