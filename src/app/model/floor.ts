import { Inmueble } from "./inmueble";

export class Floor extends Inmueble {
    floor: number;
    
    constructor(idProperty: string,
                autCommunity: string,
                province: string,
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
                floor: number,
                owner: string,
                type: string) 
    {
        super(idProperty, autCommunity, province, municipality, street, title, description, numRooms, numBathrooms, numFloors, numTerraces, squareMeter, garage, price, owner, type);
        this.floor = floor;
    }
}
