import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmatComponent } from './tmat.component';

describe('TmatComponent', () => {
  let component: TmatComponent;
  let fixture: ComponentFixture<TmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
