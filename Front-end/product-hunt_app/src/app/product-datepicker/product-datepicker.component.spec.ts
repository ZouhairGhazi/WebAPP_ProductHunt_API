import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDatepickerComponent } from './product-datepicker.component';

describe('ProductDatepickerComponent', () => {
  let component: ProductDatepickerComponent;
  let fixture: ComponentFixture<ProductDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
