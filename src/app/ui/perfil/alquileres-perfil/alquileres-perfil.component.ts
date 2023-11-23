import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { Reserva } from 'src/app/model/reserva';

@Component({
  selector: 'app-alquileres-perfil',
  templateUrl: './alquileres-perfil.component.html',
  styleUrls: ['./alquileres-perfil.component.css']
})
export class AlquileresPerfilComponent {
  @Input() usuarioLogeado!: firebase.User;

  usuario!: Usuario;

  constructor(private authService: AuthService,
    private alquileresService: AlquileresService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.getUsuarioPorId(this.usuarioLogeado.uid).subscribe(usuario => {
        this.usuario = usuario;
      });
    }, 1000);
  }

  /**
   * Acepta o rechaza la solicitud de reserva dependiendo de lo que haya seleccionado el propietario
   * 
   * @param aceptada boolean que es true si el propietario acepta la reserva o false si la rechaza
   * @param reserva Reserva con todos los datos de la reserva solicitada
   */
  aceptarORechazarReserva(aceptada: boolean, reserva: Reserva) {
    this.alquileresService.aceptarORechazarReserva(aceptada, this.usuarioLogeado.uid, reserva);

    if (aceptada) {
      alert('La reserva fue aceptada');
    } else {
      alert('La reserva fue rechazada');
    }
  }
}
