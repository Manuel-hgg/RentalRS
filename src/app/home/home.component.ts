import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlquileresService } from '../services/alquileres.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listaComunidades!: Location[];
  comunidadSeleccionada!: string;

  constructor(private alquileresService: AlquileresService,
              private router: Router) {
    this.alquileresService.getComunidades().subscribe(localidades => {
      this.listaComunidades = localidades;
    })
    
    this.comunidadSeleccionada = 'All';
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
