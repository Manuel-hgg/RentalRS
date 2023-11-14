import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent {

  userLogged;
  inmueble!: Inmueble;
  private id: string;
  valoracionMedia!: number;

  userId!: string;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private alquileresService: AlquileresService,
    private authService: AuthService) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.userLogged = this.authService.getUserLogged();
    this.userLogged.subscribe(user => {
      if (user)
        this.userId = user?.uid;
    });
  }

  /**
   * Carga la propiedad que tenga la id que se pasa por la URL
   * Luego llama al metodo cargarPuntuacion() para calcular la media de las valoraciones
   */
  ngOnInit() {
    this.alquileresService.getPropertyById(this.id).subscribe(inmueble => {
      this.inmueble = inmueble;

      this.cargarPuntuacion();
    });
  }

  /**
   * Elimina la propiedad seleccionada
   */
  eliminarPropiedad() {
    if (this.inmueble) {
      this.alquileresService.borrarPropiedad(this.id);

      this.router.navigate(['/alquileres', 'All']);
    }
  }

  /**
   * Navega al componente para actualizar los datos de una propiedad
   */
  modificarInmueble() {
    if (this.inmueble)
      this.router.navigate(['/property', 'edit', this.inmueble.idPropiedad]);
  }

  /**
   * Recoge la puntuación que da un usuario al inmueble
   * 
   * @param valor number, puntuacion del usuario
   */
  puntuar(valor: number): void {
    if (this.userId) {
      console.log(valor);

      const stars = document.querySelectorAll('.star');
      stars.forEach((star, index) => {
        index < valor ? star.classList.add('star-filled') : star.classList.remove('star-filled');
      });
    } else {
      alert('Debes iniciar sesión para poder puntuar un inmueble');
    }
  }

  /**
   * Calcula la media de las valoraciones de una propiedad
   */
  private cargarPuntuacion() {
    if (this.inmueble.puntuaciones.length == 0) {
      this.valoracionMedia = 0;
    } else {
      for (let sc of this.inmueble.puntuaciones) {
        this.valoracionMedia += sc;
      }

      this.valoracionMedia = this.valoracionMedia / this.inmueble.puntuaciones.length;

      console.log(this.valoracionMedia)
    }
  }
}
