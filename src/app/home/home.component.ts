import { AlquileresService } from '../services/alquileres.service';
import { LocationService } from '../services/location.service';
import { Location } from '../model/location';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listaComunidades!: Location[];
  comunidadSeleccionada!: string;

  constructor(private locationService: LocationService,
              private router: Router) {
    this.locationService.getComunidades().subscribe(localidades => {
      this.listaComunidades = localidades;
    })
    
    this.comunidadSeleccionada = 'todos';
  }

  /**
   * Navega hacia la lista de alquileres disponibles
   */
  buscarAlquileres(): void {
    if (this.comunidadSeleccionada !== '')
      this.router.navigate(['/alquileres', this.comunidadSeleccionada]);
    else
      alert('Elige un destino');
  }
}
