import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSelectControlComponent } from './async-select-control.component';

describe('AsyncSelectControlComponent', () => {
  let component: AsyncSelectControlComponent;
  let fixture: ComponentFixture<AsyncSelectControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncSelectControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
