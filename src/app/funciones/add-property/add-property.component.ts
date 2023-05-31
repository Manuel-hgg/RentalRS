import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/model/house';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  tipoSeleccionado: string = 'house';

  autCommunity!: string;
  municipio!: string;
  calle!: string;
  titulo!: string;
  descripcion!: string;
  numHabitaciones!: number;
  numBanios!: number;
  numPisos!: number;
  numTerrazas!: number;
  metrosCuadrados!: number;
  garaje: boolean = false;
  precio!: number;
  exterior: boolean = false;
  planta!: number;

  autCommunitys;

  constructor(private alquileresService: AlquileresService,
              private router: Router) {
    this.autCommunitys = alquileresService.getAllCommunities();
  }

  addProperty(): void {
    if (this.tipoSeleccionado === 'house')
      this.alquileresService.addHouse(this.autCommunity, this.municipio, this.calle, this.titulo, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.exterior);
    else
      this.alquileresService.addFloor(this.autCommunity, this.municipio, this.calle, this.titulo, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.planta);
    
    alert(this.tipoSeleccionado + ' agregado con exito');
    this.router.navigate(['profile'])
  }

}
