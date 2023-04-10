import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponyItemComponent } from './compony-item.component';

describe('ComponyItemComponent', () => {
  let component: ComponyItemComponent;
  let fixture: ComponentFixture<ComponyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponyItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
