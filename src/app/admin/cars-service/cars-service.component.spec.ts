import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsServiceComponent } from './cars-service.component';

describe('CarsServiceComponent', () => {
  let component: CarsServiceComponent;
  let fixture: ComponentFixture<CarsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
