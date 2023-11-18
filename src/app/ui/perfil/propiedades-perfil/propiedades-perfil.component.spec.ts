import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesPerfilComponent } from './propiedades-perfil.component';

describe('PropiedadesPerfilComponent', () => {
  let component: PropiedadesPerfilComponent;
  let fixture: ComponentFixture<PropiedadesPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadesPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadesPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
