import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcarsComponent } from './showcars.component';

describe('ShowcarsComponent', () => {
  let component: ShowcarsComponent;
  let fixture: ComponentFixture<ShowcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
