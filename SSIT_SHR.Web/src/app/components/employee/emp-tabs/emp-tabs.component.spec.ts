import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTabsComponent } from './emp-tabs.component';

describe('EmpTabsComponent', () => {
  let component: EmpTabsComponent;
  let fixture: ComponentFixture<EmpTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
