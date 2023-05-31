import { Injectable } from '@angular/core';
import { Floor } from '../model/floor';
import { House } from '../model/house';
import { Inmueble } from '../model/inmueble';
import { Firestore, collection, query, getDocs, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {

  //private collectionHouses: CollectionReference<House>;

  constructor(private firestore: Firestore) { 
    
  }

  

  private listaInmuebles: Inmueble[] = [
      new Floor(1,'Asturias', 'Gijón', 'calle1','titulo1', 'descripcion1', 3, 2, 1, 0, 80, false, 50, 5),
      new House(2,'Asturias', 'Langreo', 'calle2','titulo2', 'descripcion2', 4, 2, 2, 0, 120, true, 60, true),
      new Floor(3,'Valencia', 'Sagunto', 'calle3','titulo3', 'descripcion3', 1, 1, 1, 0, 40, true, 55, 4),
      new Floor(4,'Asturias', 'Oviedo', 'calle4','titulo4', 'descripcion4', 3, 2, 1, 0, 80, false, 35, 3),
      new House(5,'Galicia', 'Rinlo', 'calle5','titulo5', 'descripcion5', 2, 3, 1, 0, 85, true, 40, false),
  ]

  getAll(): Inmueble[] {
    return this.listaInmuebles;
  }

  

  getByCommunity(community: string): Inmueble[] {
    let listaInmueblesCommunity: Inmueble[] = [];
    
    for (let i of this.listaInmuebles) {
      if (i.autCommunity === community){
        listaInmueblesCommunity.push(i);
      }
    }

    return listaInmueblesCommunity;
  }
  
  addHouse(autCommunity:string, municipio:string, calle:string, titulo:string, desc:string, numHabitaciones:number, numBanios:number, numPisos:number, numTerrazas:number, metrosCuadrados:number, garaje: boolean, precio: number, exterior: boolean) {
    let house: House;
    house = new House(10, autCommunity, municipio, calle, titulo, desc, numHabitaciones, numBanios, numPisos, numTerrazas, metrosCuadrados, garaje, precio, exterior);
    const placeRef = collection(this.firestore, 'houses');
    const data = this.toObject(house); 

    return addDoc(placeRef, data);
  }

  addFloor(autCommunity:string, municipio:string, calle:string, titulo:string, desc:string, numHabitaciones:number, numBanios:number, numPisos:number, numTerrazas:number, metrosCuadrados:number, garaje: boolean, precio: number, planta: number) {
    let floor: Floor;
    floor = new Floor(1, autCommunity, municipio, calle, titulo, desc, numHabitaciones, numBanios, numBanios, numTerrazas, metrosCuadrados, garaje, precio, planta);

    const placeRef = collection(this.firestore, 'floors');
    const data = this.toObject(floor);

    return addDoc(placeRef, data);
  }

  getAllCommunities(): string[] {
    let communities: string[] = [];

    this.listaInmuebles.forEach(inmueble => {
      if (!communities.includes(inmueble.autCommunity)) {
        communities.push(inmueble.autCommunity);
      }
    });

    return communities;
  }

  getPropertyById(id: number): Inmueble | undefined {
    return this.listaInmuebles.find(i => i.id == id);
  }

  private toObject(objeto: any): any {
    const propiedades = Object.getOwnPropertyNames(objeto);
    const objetoPlano: any = {};
    
    propiedades.forEach(propiedad => {
      objetoPlano[propiedad] = objeto[propiedad];
    });
    
    return objetoPlano;
  }
}
