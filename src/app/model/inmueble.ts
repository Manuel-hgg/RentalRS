import { Reserva } from "./reserva";

export class Inmueble {
    idPropiedad: string;
    comunidadAutonoma: string;
    provincia: string;
    municipio: string;
    calle: string;
    titulo: string;
    foto: string;
    descripcion: string;
    numHabitaciones: number;
    numBanios: number;
    numPisos: number;
    numTerrazas: number;
    metrosCuadrados: number;
    garaje: boolean;
    precio: number;
    propietario: string;
    correoPropietario: string;
    puntuaciones: { [usuarioId: string]: number };
    comentarios: { [usuarioId: string]: string[] };
    reservas: Reserva[];
    tipo: string;
    
    constructor(idPropiedad: string,
        comunidadAutonoma: string,
        provincia: string,
        municipio: string,
        calle: string,
        titulo: string,
        foto: string,
        descripcion: string,
        numHabitaciones: number,
        numBanios: number,
        numPisos: number,
        numTerrazas: number,
        metrosCuadrados: number,
        garaje: boolean,
        precio: number,
        propietario: string,
        correoPropietario: string,
        tipo: string) 
    {
        this.idPropiedad = idPropiedad,
        this.comunidadAutonoma = comunidadAutonoma;
        this.provincia = provincia;
        this.municipio = municipio;
        this.calle = calle;
        this.titulo = titulo;
        this.foto = foto;
        this.descripcion = descripcion;
        this.numHabitaciones = numHabitaciones;
        this.numBanios = numBanios;
        this.numPisos = numPisos;
        this.numTerrazas = numTerrazas;
        this.metrosCuadrados = metrosCuadrados;
        this.garaje = garaje;
        this.precio = precio;
        this.propietario = propietario;
        this.correoPropietario = correoPropietario;
        this.puntuaciones = {};
        this.comentarios = {};
        this.reservas = [];
        this.tipo = tipo;
    }
}
