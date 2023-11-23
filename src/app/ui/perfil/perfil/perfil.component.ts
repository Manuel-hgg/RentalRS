import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuarioLogeado: any;
  listaInmuebles!: Inmueble[];

  constructor(private authService: AuthService,
    private alquileresService: AlquileresService,
    private router: Router) { }

  /** 
   * Comprueba si el usuario esta logeado, en caso de que no lo este lo redirige a la pagina de Login
   */
  ngOnInit() {
    this.authService.getUsuarioLogeado().subscribe(usuario => {
      this.usuarioLogeado = usuario;

      if (!usuario) {
        this.router.navigate(['/login']);
      } else {
        this.cargarInmuebles(usuario.uid);
      }
    });
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
