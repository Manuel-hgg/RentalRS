import { Inmueble } from "./inmueble";

export class Floor extends Inmueble {
    planta: number;
    
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
                precio: number,
                planta: number) 
    {
        super(id, autCommunity, municipio, calle, titulo, descripcion, numHabitaciones, numBanios, numPisos, numTerrazas, metrosCuadrados, garaje, precio);
        this.planta = planta;
    }
}
