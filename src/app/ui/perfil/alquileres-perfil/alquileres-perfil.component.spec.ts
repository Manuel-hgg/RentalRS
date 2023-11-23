import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquileresPerfilComponent } from './alquileres-perfil.component';

describe('AlquileresPerfilComponent', () => {
  let component: AlquileresPerfilComponent;
  let fixture: ComponentFixture<AlquileresPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlquileresPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquileresPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
