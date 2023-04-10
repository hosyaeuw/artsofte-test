import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponySortComponent } from './compony-sort.component';

describe('ComponySortComponent', () => {
  let component: ComponySortComponent;
  let fixture: ComponentFixture<ComponySortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponySortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
