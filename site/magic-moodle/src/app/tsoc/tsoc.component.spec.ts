import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsocComponent } from './tsoc.component';

describe('TsocComponent', () => {
  let component: TsocComponent;
  let fixture: ComponentFixture<TsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
