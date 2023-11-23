import { AlquileresService } from 'src/app/services/alquileres.service';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/model/location';
import { Inmueble } from 'src/app/model/inmueble';
import { Component } from '@angular/core';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  tipoSeleccionado: string = 'casa';

  comunidadAutonoma!: string;
  provincia!: string;
  municipio!: string;
  calle!: string;
  titulo!: string;
  foto!: string;
  descripcion!: string;
  numHabitaciones!: number;
  numBanios!: number;
  numPisos!: number;
  numTerrazas!: number;
  metrosCuadrados!: number;
  garaje: boolean = false;
  precio!: number;
  piso!: number;
  propietario!: string;
  puntuaciones!: { [usuarioId: string]: number };

  listaComunidades!: Location[];
  listaProvincias!: string[];

  usuarioLogeado!: firebase.User;
  id!: string | null;

  constructor(private alquileresService: AlquileresService,
    private locationService: LocationService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.locationService.getComunidades().subscribe(locations => {
      this.listaComunidades = locations;
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || null;
    });

    this.authService.getUsuarioLogeado().subscribe(usuario => {
      if (usuario)
        this.usuarioLogeado = usuario;
      else
        this.router.navigate(['/home']);
    });

    if (this.id !== null)
      this.cargarPropiedad();
  }

  /**
   * Añade una nueva propiedad
   */
  aniadirPropiedad(): void {
    let tipo;

    if (this.usuarioLogeado) {
      if (this.tipoSeleccionado === 'casa')
        tipo = 'casa';
      else
        tipo = 'piso';

      if (this.usuarioLogeado.email) {
        this.alquileresService.aniadirInmueble(this.comunidadAutonoma, this.provincia, this.municipio, this.calle, this.titulo, this.foto, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.usuarioLogeado.uid, this.usuarioLogeado.email, tipo);

        alert(this.tipoSeleccionado + ' agregado con exito');
        this.router.navigate(['/perfil']);
      } else {
        alert('No se ha podido subir el inmueble');
      }
    }
  }

  /**
   * Actualiza los datos de una propiedad
   */
  actualizarPropiedad(): void {
    var propiedadActualizada;
    if (this.id !== null && this.usuarioLogeado.email) {
      propiedadActualizada = new Inmueble(this.id, this.comunidadAutonoma, this.provincia, this.municipio, this.calle, this.titulo, this.foto, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.propietario, this.usuarioLogeado.email, this.tipoSeleccionado);

      propiedadActualizada.puntuaciones = this.puntuaciones;

      this.alquileresService.modificarPropiedad(this.id, propiedadActualizada);

      alert('La propiedad ha sido actualizada');

      this.router.navigate(['/view', this.id]);
    }
  }

  /**
   * Carga las provincias de la comunidad autonoma seleccionada
   */
  cargarProvincias() {
    this.locationService.getProvinciasPorComunidad(this.comunidadAutonoma).subscribe(provincias => {
      this.listaProvincias = provincias;
    });
  }

  /**
   * Navega al componente anterior
   */
  cancelar(): void {
    if (this.id !== null)
      this.router.navigate(['/view', this.id]);
    else
      this.router.navigate(['/perfil']);
  }

  /**
   * Sube una imagen al storage de Firebase
   * @param event, la imagen a subir
   */
  subirImagen(event: any) {
    this.alquileresService.subirImagen(event).then(url => {
      this.foto = url;
    });
  }

  /**
   * Carga los datos del inmueble que va a ser modificado
   */
  private cargarPropiedad(): void {
    if (this.id !== null) {
      this.alquileresService.getInmueblePorId(this.id).subscribe(inmueble => {
        this.comunidadAutonoma = inmueble.comunidadAutonoma;
        this.provincia = inmueble.provincia;
        this.municipio = inmueble.municipio;
        this.calle = inmueble.calle;
        this.titulo = inmueble.titulo;
        this.foto = inmueble.foto;
        this.descripcion = inmueble.descripcion;
        this.numHabitaciones = inmueble.numHabitaciones;
        this.numBanios = inmueble.numBanios;
        this.numPisos = inmueble.numPisos;
        this.numTerrazas = inmueble.numTerrazas
        this.metrosCuadrados = inmueble.metrosCuadrados;
        this.garaje = inmueble.garaje;
        this.precio = inmueble.precio;
        this.propietario = inmueble.propietario;
        this.puntuaciones = inmueble.puntuaciones;
        this.tipoSeleccionado = inmueble.tipo;

        this.cargarProvincias();

        if (this.propietario !== this.usuarioLogeado.uid) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}