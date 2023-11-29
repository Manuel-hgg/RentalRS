import { Component, Input } from '@angular/core';
import { Reserva } from 'src/app/model/reserva';

@Component({
  selector: 'app-item-reserva-perfil',
  templateUrl: './item-reserva-perfil.component.html',
  styleUrls: ['./item-reserva-perfil.component.css']
})
export class ItemReservaPerfilComponent {
  @Input() reserva!: Reserva;
}
