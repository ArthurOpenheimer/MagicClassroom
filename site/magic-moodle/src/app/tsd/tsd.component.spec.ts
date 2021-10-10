import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsdComponent } from './tsd.component';

describe('TsdComponent', () => {
  let component: TsdComponent;
  let fixture: ComponentFixture<TsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
