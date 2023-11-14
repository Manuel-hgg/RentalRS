import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAlquileresComponent } from './item-alquileres.component';

describe('ItemAlquileresComponent', () => {
  let component: ItemAlquileresComponent;
  let fixture: ComponentFixture<ItemAlquileresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAlquileresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
