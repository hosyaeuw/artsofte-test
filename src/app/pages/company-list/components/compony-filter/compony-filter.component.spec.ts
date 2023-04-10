import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponyFilterComponent } from './compony-filter.component';

describe('ComponyFilterComponent', () => {
  let component: ComponyFilterComponent;
  let fixture: ComponentFixture<ComponyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponyFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
