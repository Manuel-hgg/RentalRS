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
   * Si la comunidad seleccionada es 'All', carga todos los alquileres de todas las comunidades
   * Si la comunidad seleccionada no es 'All', carga todos los alquileres que pertenecen unicamente a la comunidad seleccionada
   */
  private cargarListaDeAlquileres(): void {
    if (this.comunidadSeleccionada === 'All') {
      this.suscripcionAlquileres = this.alquileresService.getInmuebles().subscribe(inmuebles => {
        this.listaAlquileres = inmuebles;
        this.filtrar('Cualquiera');
      });
    } else {
      this.suscripcionAlquileres = this.alquileresService.getAlquileresPorComunidad(this.comunidadSeleccionada).subscribe(inmuebles => {
        this.listaAlquileres = inmuebles;
        this.filtrar('Cualquiera');
      });
    }
  }

  /**
     * Navega a la pagina anterior
     */
  volverAtras(): void {
    this.route.navigate(['/home']);
  }

  /**
   * Filtra la lista de alquileres disponibles por su provincia
   * 
   * @param provincia 
   */
  filtrar(provincia: string): void {
    if (provincia === 'Cualquiera') {
      this.listaAlquileresFiltrada = this.listaAlquileres;
    } else {
      this.listaAlquileresFiltrada = this.listaAlquileres.filter((inmueble: Inmueble) => {
        return inmueble.provincia === provincia;
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
