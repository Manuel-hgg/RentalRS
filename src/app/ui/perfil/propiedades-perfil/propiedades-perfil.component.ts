import { Component, Input } from '@angular/core';
import { Inmueble } from 'src/app/model/inmueble';

@Component({
  selector: 'app-propiedades-perfil',
  templateUrl: './propiedades-perfil.component.html',
  styleUrls: ['./propiedades-perfil.component.css']
})
export class PropiedadesPerfilComponent {
  @Input() listaInmuebles!: Inmueble[];
}
