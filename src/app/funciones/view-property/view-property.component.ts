import { AlquileresService } from 'src/app/services/alquileres.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { Component } from '@angular/core';
import firebase from 'firebase/compat';
import { Reserva } from 'src/app/model/reserva';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent {

  idPropiedad: string;
  usuarioLogeado!: firebase.User;
  inmueble!: Inmueble;
  valoracionMedia!: number;
  comentarios!: string[][];
  comentario: string = '';

  mostrarOcultar: string;

  fechaInicio!: any;
  fechaFin!: any;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private alquileresService: AlquileresService,
    private authService: AuthService) {
    this.idPropiedad = this.activatedRouter.snapshot.params['id'];
    this.authService.getUsuarioLogeado().subscribe(usuario => {
      if (usuario)
        this.usuarioLogeado = usuario;
    });

    this.mostrarOcultar = 'Mostrar reservas';
  }

  /**
   * Carga la propiedad que tenga la id que se pasa por la URL
   * Luego llama al metodo cargarPuntuacion() para calcular la media de las valoraciones
   * Y en caso de que el usuario ya haya puntuado el inmueble anteriormente carga tambien su puntuacion
   */
  ngOnInit() {
    this.alquileresService.getInmueblePorId(this.idPropiedad).subscribe(inmueble => {
      this.inmueble = inmueble;

      this.cargarPuntuacionMedia();

      this.comentarios = Object.values(inmueble.comentarios);

      if (this.comprobarUsuario() && this.inmueble.puntuaciones[this.usuarioLogeado.uid]) {
        setTimeout(() => {
          this.colorearEstrellas(this.inmueble.puntuaciones[this.usuarioLogeado.uid]);
        }, 1000);
      }
    });
  }

  /**
   * Elimina la propiedad seleccionada
   */
  eliminarPropiedad() {
    if (this.inmueble) {
      this.alquileresService.borrarPropiedad(this.idPropiedad);

      this.router.navigate(['/alquileres', 'todos']);
    }
  }

  /**
   * Navega al componente para actualizar los datos de una propiedad
   */
  modificarInmueble() {
    if (this.inmueble)
      this.router.navigate(['/propiedad', 'editar', this.inmueble.idPropiedad]);
  }

  /**
   * Recoge la puntuación que da un usuario al inmueble
   * 
   * @param valor number, puntuacion del usuario
   */
  puntuar(valor: number): void {
    if (this.comprobarUsuario()) {
      this.alquileresService.aniadirPuntuacionPropiedad(this.inmueble.idPropiedad, this.usuarioLogeado.uid, valor);

      this.colorearEstrellas(valor);
    } else {
      alert('Debes iniciar sesión para poder puntuar un inmueble');
    }
  }

  /**
   * Publica un comentario en el inmueble
   */
  agregarComentario(): void {
    if (this.comprobarUsuario()) {
      if (this.comentario !== '' && this.usuarioLogeado.displayName) {
        this.authService.agregarComentario(this.usuarioLogeado.uid, this.idPropiedad, this.comentario);
        this.alquileresService.aniadirComentarioPropiedad(this.idPropiedad, this.usuarioLogeado.uid, this.usuarioLogeado.displayName, this.comentario);
        this.comentario = '';
        alert('El comentario se ha publicado');
      } else {
        alert('Debes escribir un comentario');
      }
    } else {
      alert('Debes iniciar sesión para publicar un comentario');
    }
  }

  /**
   * Comprueba si se puede realizar o no la reserva
   * En caso de que sea posible hace la solicitud al propietario de la reserva pedida por el usuario
   */
  solicitarReserva() {
    if (this.comprobarUsuario()) {
      const solicitudReserva: Reserva = {
        idPropiedad: this.idPropiedad,
        idCliente: this.usuarioLogeado.uid,
        tituloPropiedad: this.inmueble.titulo,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
      }

      if (this.fechaFin === undefined || this.fechaInicio === undefined) {
        alert('Debes introducir una fecha válida');
      } else {
        const fechaInicioDate = new Date(this.fechaInicio);
        const fechaFinalDate = new Date(this.fechaFin);
        const fechaActual = new Date();

        fechaActual.setHours(0, 0, 0, 0);

        if (!(fechaInicioDate > fechaFinalDate || fechaFinalDate < fechaActual || fechaInicioDate < fechaActual)) {
          if (this.comprobarDisponibilidad(this.inmueble.reservas, fechaInicioDate, fechaFinalDate)) {
            this.alquileresService.solicitarReserva(this.inmueble.propietario, solicitudReserva);
            alert('Se ha echo la solicitud de reserva');
          } else {
            alert('La fecha seleccionada no se encuentra disponible');
          }
        } else {
          alert('La fecha introducida no es valida');
        }
      }
    } else {
      alert('Debes iniciar sesión para reservar un inmueble');
    }
  }

  /**
   * Muestra u oculta la lista de reservas echas en la propiedad
   */
  mostrarOcultarReservas() {
    if (this.mostrarOcultar === 'Mostrar reservas')
      this.mostrarOcultar = 'Ocultar reservas';
    else 
      this.mostrarOcultar = 'Mostrar reservas';
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

  /**
   * Cambia el color de las estrellas a amarillo dependiendo de la puntuacion que haya dado el usuario
   * 
   * @param valor, el numero de estrellas que dio el usuario al inmueble
   */
  private colorearEstrellas(valor: number): void {
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach((estrella, index) => {
      index < valor ? estrella.classList.add('estrella-seleccionada') : estrella.classList.remove('estrella-seleccionada');
    });
  }

  /**
   * Comprueba que la fecha seleccionada para el usuario para solicitar la reserva no este ya reservada por otro usuario
   * 
   * @param reservas Reservas[] con todas las reservas echas en la propiedad
   * @param fechaInicio Date de la fecha de inicio escogida por el usuario
   * @param fechaFin Date de la fecha final escogida por el usuario
   * @returns True si el rango de fechas esta disponible para hacer la reserva, False si no esta disponible
   */
  private comprobarDisponibilidad(reservas: Reserva[], fechaInicio: Date, fechaFin: Date): boolean {
    if (this.inmueble.reservas.length > 0) {
      for (let reserva of reservas) {
        const fechaInicioReserva = new Date(reserva.fechaInicio);
        const fechaFinReserva = new Date(reserva.fechaFin);

        if (
          (fechaInicio >= fechaInicioReserva && fechaInicio <= fechaFinReserva) ||
          (fechaFin >= fechaInicioReserva && fechaFin <= fechaFinReserva) ||
          (fechaInicio <= fechaInicioReserva && fechaFin >= fechaFinReserva)
        ) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Comprueba si el usuario esta logeado o no
   * 
   * @returns true si esta logeado, false si no esta logeado 
   */
  private comprobarUsuario(): boolean {
    return this.usuarioLogeado !== undefined ? true : false;
  }
}
