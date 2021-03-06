import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {ConfigurableFormGroupComponent, FormStatus} from '../configurable-form-group-component';
import {FormGroupConfig} from '../../config';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {buildFormGroup} from '../../services/form-group-builder';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements ConfigurableFormGroupComponent, OnInit {
  @Input() config: FormGroupConfig;
  @Output() statusChange = new EventEmitter<FormStatus>();
  @Output() valueChange = new EventEmitter();
  @ViewChildren('formField', {read: ViewContainerRef}) fields: QueryList<ViewContainerRef>;
  form: FormGroup;

  ngOnInit(): void {
    this.form = buildFormGroup(this.config);
    this.form.valueChanges.subscribe(e => this.valueChange.next(e));
    this.form.statusChanges.subscribe(e => this.statusChange.next(e));
  }
}
