import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSolicitudPerfilComponent } from './item-solicitud-perfil.component';

describe('ItemSolicitudPerfilComponent', () => {
  let component: ItemSolicitudPerfilComponent;
  let fixture: ComponentFixture<ItemSolicitudPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSolicitudPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSolicitudPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
