import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userLogged = this.authService.getUserLogged();
  listaInmuebles!: Inmueble[];

  constructor(private authService: AuthService,
    private alquileresService: AlquileresService,
    private router: Router) {

  }

  /** 
   * Comprueba si el usuario esta logeado, en caso de que no lo este lo redirige a la pagina de Login
   */
  ngOnInit() {
      this.userLogged.subscribe(user => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.cargarInmuebles(user.uid);
        }
      });
  }

  /**
   * Cierra la sesión del usuario
   */
  cerrarSesion(): void {
    this.authService.cerrarSesion();

    this.router.navigate(['/login']);
  }

  /**
   * Navega al componente para añadir una nueva propiedad 
   */
  aniadirPropiedad(): void {
    this.router.navigate(['/property/add']);
  }

  /**
   * Carga todos los inmuebles que pertenecen al usuario
   * 
   * @param idUsuario id del usuario 
   */
  cargarInmuebles(idUsuario: string): void {
    this.alquileresService.getInmueblesPorPropietario(idUsuario).subscribe(inmuebles => {
      this.listaInmuebles = inmuebles;
    });
  }
}
