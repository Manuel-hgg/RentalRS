import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/model/location';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  tipoSeleccionado: string = 'house';

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
  valoraciones!: number[];

  listaComunidades!: Location[];
  listaProvincias!: string[];
  userLogged;

  usuarioLogeado!: string;
  id!: string | null;

  constructor(private alquileresService: AlquileresService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {
    this.alquileresService.getComunidades().subscribe(locations => {
      this.listaComunidades = locations;
    })
    this.userLogged = this.authService.getUserLogged();
  }

  ngOnInit() {
    this.getIdUser();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || null;
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
      if (this.tipoSeleccionado === 'house')
        tipo = 'casa';
      else
        tipo = 'piso';

      this.alquileresService.aniadirInmueble(this.comunidadAutonoma, this.provincia, this.municipio, this.calle, this.titulo, this.foto, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.usuarioLogeado, tipo);

      alert(this.tipoSeleccionado + ' agregado con exito');
      this.router.navigate(['profile'])
    }
  }

  /**
   * Actualiza los datos de una propiedad
   */
  actualizarPropiedad(): void {
    var data;
    if (this.id !== null) {

      data = new Inmueble(this.id, this.comunidadAutonoma, this.provincia, this.municipio, this.calle, this.titulo, this.foto, this.descripcion, this.numHabitaciones, this.numBanios, this.numPisos, this.numTerrazas, this.metrosCuadrados, this.garaje, this.precio, this.propietario, this.tipoSeleccionado);

      this.alquileresService.modificarPropiedad(this.id, data);

      alert('La propiedad ha sido actualizada');

      this.router.navigate(['/view', this.id]);
    }
  }

  /**
   * Carga las provincias de la comunidad autonoma seleccionada
   */
  cargarProvincias() {
    this.alquileresService.getProvinciasPorComunidad(this.comunidadAutonoma).subscribe(provincias => {
      this.listaProvincias = provincias;
    });
  }

  /**
   * Navega al componente anterior
   */
  cancelar(): void {
    if(this.id !== null) 
      this.router.navigate(['/view', this.id]);
    else
      this.router.navigate(['/profile']);
  }

  /**
   * Devuelve la id del usuario logeado
   */
  getIdUser(): void {
    this.userLogged.subscribe(user => {
      if (user)
        this.usuarioLogeado = user.uid;
    });
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
      this.alquileresService.getPropertyById(this.id).subscribe(property => {
        this.comunidadAutonoma = property.comunidadAutonoma;
        this.provincia = property.provincia;
        this.municipio = property.municipio;
        this.calle = property.calle;
        this.titulo = property.titulo;
        this.foto = property.foto;
        this.descripcion = property.descripcion;
        this.numHabitaciones = property.numHabitaciones;
        this.numBanios = property.numBanios;
        this.numPisos = property.numPisos;
        this.numTerrazas = property.numTerrazas
        this.metrosCuadrados = property.metrosCuadrados;
        this.garaje = property.garaje;
        this.precio = property.precio;
        this.propietario = property.propietario;
        this.valoraciones = property.puntuaciones;
        this.tipoSeleccionado = property.tipo;

        this.cargarProvincias();

        if (this.propietario !== this.usuarioLogeado) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}