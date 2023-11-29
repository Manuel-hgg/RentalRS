import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReservaPerfilComponent } from './item-reserva-perfil.component';

describe('ItemReservaPerfilComponent', () => {
  let component: ItemReservaPerfilComponent;
  let fixture: ComponentFixture<ItemReservaPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReservaPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemReservaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
