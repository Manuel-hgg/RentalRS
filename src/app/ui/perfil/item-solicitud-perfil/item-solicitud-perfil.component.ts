import { Component, Input } from '@angular/core';
import { Reserva } from 'src/app/model/reserva';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-item-solicitud-perfil',
  templateUrl: './item-solicitud-perfil.component.html',
  styleUrls: ['./item-solicitud-perfil.component.css']
})
export class ItemSolicitudPerfilComponent {
  @Input() solicitud!: Reserva;
  @Input() idUsuario!: string;

  constructor(private alquileresService: AlquileresService) {}

  /**
   * Acepta o rechaza la solicitud de reserva dependiendo de lo que haya seleccionado el propietario
   * 
   * @param aceptada boolean que es true si el propietario acepta la reserva o false si la rechaza
   * @param reserva Reserva con todos los datos de la reserva solicitada
   */
  aceptarORechazarReserva(aceptada: boolean, reserva: Reserva) {
    this.alquileresService.aceptarORechazarReserva(aceptada, this.idUsuario, reserva);

    if (aceptada) {
      alert('La reserva fue aceptada');
    } else {
      alert('La reserva fue rechazada');
    }
  }
}
