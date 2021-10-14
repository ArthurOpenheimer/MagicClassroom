import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TredComponent } from './tred.component';

describe('TredComponent', () => {
  let component: TredComponent;
  let fixture: ComponentFixture<TredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
