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
    puntuaciones: number[];
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
        this.puntuaciones = [];
        this.tipo = tipo;
    }
}
