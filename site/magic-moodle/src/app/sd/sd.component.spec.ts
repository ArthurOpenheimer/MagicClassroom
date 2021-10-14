import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdComponent } from './sd.component';

describe('SdComponent', () => {
  let component: SdComponent;
  let fixture: ComponentFixture<SdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
