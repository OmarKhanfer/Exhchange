import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeLabelComponent } from './exchange-label.component';

describe('ExchangeLabelComponent', () => {
  let component: ExchangeLabelComponent;
  let fixture: ComponentFixture<ExchangeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
