export class Inmueble {
    idProperty: string;
    autCommunity: string;
    municipality: string;
    street: string;
    title: string;
    description: string;
    numRooms: number;
    numBathrooms: number;
    numFloors: number;
    numTerraces: number;
    squareMeter: number;
    garage: boolean;
    price: number;
    estrellas!: number;
    owner: string;
    scores: number[];
    type: string;
    
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
                owner: string, 
                type: string) 
    {
        this.idProperty = idProperty,
        this.autCommunity = autCommunity;
        this.municipality = municipality;
        this.street = street;
        this.title = title;
        this.description = description;
        this.numRooms = numRooms;
        this.numBathrooms = numBathrooms;
        this.numFloors = numFloors;
        this.numTerraces = numTerraces;
        this.squareMeter = squareMeter;
        this.garage = garage;
        this.price = price;
        this.owner = owner;
        this.scores = [];
        this.type = type;
    }
}
