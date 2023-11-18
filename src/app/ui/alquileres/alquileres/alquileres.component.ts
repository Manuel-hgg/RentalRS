import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent {

  private suscripcionAlquileres!: Subscription;

  listaAlquileres!: Inmueble[];
  listaAlquileresFiltrada!: Inmueble[];
  comunidadSeleccionada!: string;

  constructor(private alquileresService: AlquileresService,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.comunidadSeleccionada = this.router.snapshot.params['comunidadAutonoma'];
  }

  ngAfterViewInit(): void {
    this.cargarListaDeAlquileres();
  }

  /** 
   * Carga todos los alquileres
   * Si la comunidad seleccionada es 'todos', carga todos los alquileres de todas las comunidades
   * Si la comunidad seleccionada no es 'todos', carga todos los alquileres que pertenecen unicamente a la comunidad seleccionada
   */
  private cargarListaDeAlquileres(): void {
    if (this.comunidadSeleccionada === 'todos') {
      this.suscripcionAlquileres = this.alquileresService.getInmuebles().subscribe(inmuebles => {
        this.listaAlquileres = inmuebles;
        this.listaAlquileresFiltrada = this.listaAlquileres;
      });
    } else {
      this.suscripcionAlquileres = this.alquileresService.getAlquileresPorComunidad(this.comunidadSeleccionada).subscribe(inmuebles => {
        this.listaAlquileres = inmuebles;
        this.listaAlquileresFiltrada = this.listaAlquileres;
      });
    }
  }

  /**
   * Filtra la lista de alquileres disponibles teniendo en cuenta todos los filtros aplicados por el usuario
   * 
   * @param filtros, json con todos los filtros del usuario
   */
  filtrar(filtros: any): void {
    if (filtros.casas && filtros.pisos || !filtros.casas && !filtros.pisos) {
      this.listaAlquileresFiltrada = this.listaAlquileres;
    } else if (filtros.casas) {
      this.listaAlquileresFiltrada = this.listaAlquileres.filter((inmueble: Inmueble) => {
        return inmueble.tipo === 'casa';
      });
    } else {
      this.listaAlquileresFiltrada = this.listaAlquileres.filter((inmueble: Inmueble) => {
        return inmueble.tipo === 'piso';
      });
    }

    if (filtros.provinciaSeleccionada !== 'Cualquiera') {
      this.listaAlquileresFiltrada = this.listaAlquileresFiltrada.filter((inmueble: Inmueble) => {
        return inmueble.provincia === filtros.provinciaSeleccionada;
      });
    }
    
    if (filtros.precioMax !== 0 && filtros.precioMax !== 1000) {
      this.listaAlquileresFiltrada = this.listaAlquileresFiltrada.filter((inmueble: Inmueble) => {
        return inmueble.precio <= filtros.precioMax;
      });
    }
  }
  
  /**
   * Elimina todas las suscripciones
   */
  ngOnDestroy() {
    if (this.suscripcionAlquileres)
      this.suscripcionAlquileres.unsubscribe();
  }
}
