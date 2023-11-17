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

  idUsuario!: string;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private alquileresService: AlquileresService,
    private authService: AuthService) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.userLogged = this.authService.getUserLogged();
    this.userLogged.subscribe(user => {
      if (user)
        this.idUsuario = user?.uid;
    });
  }

  /**
   * Carga la propiedad que tenga la id que se pasa por la URL
   * Luego llama al metodo cargarPuntuacion() para calcular la media de las valoraciones
   * Y en caso de que el usuario ya haya puntuado el inmueble anteriormente carga tambien su puntuacion
   */
  ngOnInit() {
    this.alquileresService.getInmueblePorId(this.id).subscribe(inmueble => {
      this.inmueble = inmueble;

      this.cargarPuntuacionMedia();

      if (this.inmueble.puntuaciones[this.idUsuario]) {
        setTimeout(() => {
          this.colorearEstrellas(this.inmueble.puntuaciones[this.idUsuario]);
        }, 1000);
      }
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
    if (this.idUsuario) {
      this.alquileresService.aniadirPuntuacionPropiedad(this.inmueble.idPropiedad, this.idUsuario, valor);

      this.colorearEstrellas(valor);
    } else {
      alert('Debes iniciar sesión para poder puntuar un inmueble');
    }
  }

  /**
   * Cambia el color de las estrellas a amarillo dependiendo de la puntuacion que haya dado el usuario
   * 
   * @param valor, el numero de estrellas que dio el usuario al inmueble
   */
  colorearEstrellas(valor: number): void {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      index < valor ? star.classList.add('star-filled') : star.classList.remove('star-filled');
    });
  }

  /**
   * Calcula la media de las valoraciones de una propiedad
   */
  private cargarPuntuacionMedia() {
    const puntuaciones = this.inmueble.puntuaciones;
    const totalPuntuaciones = Object.keys(puntuaciones).length;

    if (totalPuntuaciones === 0) {
      this.valoracionMedia = 0;
    } else {
      let sumaPuntuaciones = 0;

      for (const usuarioId in puntuaciones) {
        sumaPuntuaciones += puntuaciones[usuarioId];
      }

      this.valoracionMedia = sumaPuntuaciones / totalPuntuaciones;

      this.valoracionMedia = Math.min(5, this.valoracionMedia);
    }
  }
}
