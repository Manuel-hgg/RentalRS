import { Component, Input } from '@angular/core';
import { Inmueble } from 'src/app/model/inmueble';

@Component({
  selector: 'app-item-alquileres',
  templateUrl: './item-alquileres.component.html',
  styleUrls: ['./item-alquileres.component.css']
})
export class ItemAlquileresComponent {
  @Input() alquiler!:Inmueble;
}
