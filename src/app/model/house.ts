import { Inmueble } from "./inmueble";

export class House extends Inmueble {

    exterior: boolean;

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
                exterior: boolean) 
    {
        super(id,autCommunity, municipio, calle,titulo, descripcion, numHabitaciones, numBanios, numPisos, numTerrazas, metrosCuadrados, garaje, precio);
        this.exterior = exterior;
    }
}
