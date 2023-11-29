import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-alquileres-perfil',
  templateUrl: './alquileres-perfil.component.html',
  styleUrls: ['./alquileres-perfil.component.css']
})
export class AlquileresPerfilComponent {
  @Input() usuarioLogeado!: firebase.User;

  usuario!: Usuario;
  mostrarSolicitudes: boolean;
  mostrarReservas: boolean;
  srcSolicitudes: string;
  srcReservas: string;

  constructor(private authService: AuthService) {
    this.mostrarSolicitudes = true;
    this.mostrarReservas = false;
    this.srcSolicitudes = 'assets/images/mostrar.png';
    this.srcReservas = 'assets/images/ocultar.png'; 
  }

  ngOnInit() {
    setTimeout(() => {
      this.authService.getUsuarioPorId(this.usuarioLogeado.uid).subscribe(usuario => {
        this.usuario = usuario;
      });
    }, 1000);
  }

  mostrarOcultarSolicitudes(): void {
    this.mostrarSolicitudes = !this.mostrarSolicitudes;

    if(this.mostrarSolicitudes) 
      this.srcSolicitudes = 'assets/images/mostrar.png';
    else
      this.srcSolicitudes = 'assets/images/ocultar.png';
  }

  mostrarOcultarReservas(): void {
    this.mostrarReservas = !this.mostrarReservas;

    if(this.mostrarReservas) 
      this.srcReservas = 'assets/images/mostrar.png';
    else
      this.srcReservas = 'assets/images/ocultar.png';
  }
}
