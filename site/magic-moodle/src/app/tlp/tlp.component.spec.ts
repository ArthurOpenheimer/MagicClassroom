import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlpComponent } from './tlp.component';

describe('TlpComponent', () => {
  let component: TlpComponent;
  let fixture: ComponentFixture<TlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
