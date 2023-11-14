import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  @Input() comunidadSeleccionada!: string;
  @Output() emitter = new EventEmitter<string>();

  listaProvincias!: string[];
  provinciaSeleccionada!: string;

  constructor (private alquileresService: AlquileresService) {
    this.provinciaSeleccionada = 'Cualquiera';
  }

  ngOnInit(): void {
    this.alquileresService.getProvinciasPorComunidad(this.comunidadSeleccionada).subscribe(provincias => {
      this.listaProvincias = provincias;
    });
  }

  filtrar(): void {
    this.emitter.emit(this.provinciaSeleccionada);
  }
}
