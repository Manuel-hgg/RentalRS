export class Inmueble {
    id: number;
    autCommunity: string;
    municipio: string;
    calle: string;
    titulo: string;
    descripcion: string;
    numHabitaciones: number;
    numBanios: number;
    numPisos: number;
    numTerrazas: number;
    metrosCuadrados: number;
    garaje: boolean;
    precio: number;
    estrellas!: number;
    
    constructor(id: number,
                autCommunity: string,
                municipio: string,
                calle: string,
                titulo: string,
                descripcion: string,
                numHabitaciones: number,
                numBanios: number,
                numPisos: number,
                numTerrazas: number,
                metrosCuadrados: number,
                garaje: boolean,
                precio: number) 
    {
        this.id = id;
        this.autCommunity = autCommunity;
        this.municipio = municipio;
        this.calle = calle;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.numHabitaciones = numHabitaciones;
        this.numBanios = numBanios;
        this.numPisos = numPisos;
        this.numTerrazas = numTerrazas;
        this.metrosCuadrados = metrosCuadrados;
        this.garaje = garaje;
        this.precio = precio;
    }
}
