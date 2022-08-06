import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentsComponent } from './admin-rents.component';

describe('AdminRentsComponent', () => {
  let component: AdminRentsComponent;
  let fixture: ComponentFixture<AdminRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
