import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  @Input() comunidadSeleccionada!: string;
  @Output() emitter = new EventEmitter<any>();

  listaProvincias!: string[];
  filtros = {
    provinciaSeleccionada: 'Cualquiera',
    casas: false,
    pisos: false,
    precioMax: 0
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getProvinciasPorComunidad(this.comunidadSeleccionada).subscribe(provincias => {
      this.listaProvincias = provincias;
    });
  }

  /**
   * Envia todos los filtros puestos por el usuario al componente padre
   */
  filtrar(): void {
    this.emitter.emit(this.filtros);
  }

  /**
   * Elimina todos los filtros puestos por el usuario y se lo envia al componente padre
   */
  borrarFiltros(): void {
    this.filtros = {
      provinciaSeleccionada: 'Cualquiera',
      casas: false,
      pisos: false,
      precioMax: 0
    }

    this.emitter.emit(this.filtros);
  }
}
