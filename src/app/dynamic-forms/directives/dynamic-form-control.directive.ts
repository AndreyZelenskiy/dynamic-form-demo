import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {FormControlConfig} from '../config/components';
import {Components, FormControlComponentFactory} from '../services/form-component-factory';
import {FormControl, FormControlDirective, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appDynamicFormControl]'
})
export class DynamicFormControlDirective<T> implements OnInit, OnChanges, OnDestroy {
  @Input() config: FormControlConfig<T>;
  @Input() form: FormControl;
  @Input() group: FormGroup;
  @Input() disabled: boolean;

  @Output() valueChange = new EventEmitter();
  @Output() statusChange = new EventEmitter();

  formControlDirective: FormControlDirective;
  private componentRef: ComponentRef<Components>;
  private lastChanges: SimpleChanges | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private containerRef: ViewContainerRef,
              private componentFactory: FormControlComponentFactory,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.createComponent();

    this.assignFormControlDirective();

    this.changeDetector.detectChanges();

    this.initializeOutputs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControlDirective !== undefined) {
      this.formControlDirective.ngOnChanges(changes);
      this.lastChanges = null;
    } else {
      this.lastChanges = changes;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  private initializeOutputs() {
    this.subscriptions.push(this.form.valueChanges.subscribe(v => this.valueChange.next(v)));
    this.subscriptions.push(this.form.statusChanges.subscribe(v => this.statusChange.next(v)));
  }

  private assignFormControlDirective() {
    const asyncValidators = this.form.asyncValidator ? [this.form.asyncValidator] : [];
    const validators = this.form.validator ? [this.form.validator] : [];
    this.formControlDirective = new FormControlDirective(
      validators,
      asyncValidators,
      [this.componentRef.instance],
      null);
    this.formControlDirective.form = this.form;
    if (this.lastChanges !== null) {
      this.formControlDirective.ngOnChanges(this.lastChanges);
    }
  }

  private createComponent() {
    this.componentRef = this.containerRef.createComponent(this.componentFactory.getFormControlComponentFactory(this.config));
    this.componentRef.instance.config = <any>this.config;
  }
}
