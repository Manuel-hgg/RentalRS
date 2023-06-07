import { Inmueble } from "./inmueble";

export class House extends Inmueble {

    outside: boolean;

    constructor(idProperty: string,
                autCommunity: string,
                municipality: string,
                street: string,
                title: string,
                description: string,
                numRooms: number,
                numBathrooms: number,
                numFloors: number,
                numTerraces: number,
                squareMeter: number,
                garage: boolean,
                price: number,
                outside: boolean,
                owner: string,
                type: string) 
    {
        super(idProperty, autCommunity, municipality, street, title, description, numRooms, numBathrooms, numFloors, numTerraces, squareMeter, garage, price, owner, type);
        this.outside = outside;
    }
}
