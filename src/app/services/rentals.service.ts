import { Injectable } from '@angular/core';
import { Floor } from '../model/floor';
import { House } from '../model/house';
import { Firestore, collection, addDoc, collectionData, query, where, doc, docData, setDoc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable, combineLatest, map } from 'rxjs';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(private firestore: Firestore) { }

  /**
   * Retrieves all houses and floors from the bbdd
   * @returns an Observable with array of House and Floor 
   */
  getAll(): Observable<(House | Floor)[]> {
    const housesRef = collection(this.firestore, 'houses');
    const floorsRef = collection(this.firestore, 'floors');

    const houses$ = collectionData(housesRef, { idField: 'id' });
    const floors$ = collectionData(floorsRef, { idField: 'id' });

    return combineLatest([houses$, floors$]).pipe(
      map(([houses, floors]) => [...houses, ...floors])
    ) as Observable<(House | Floor)[]>;
  }

  /**
   * Retrieves all locations from the bbdd
   * 
   * @returns an Observable with array of Location
   */
  getAllCommunities(): Observable<Location[]> {
    const locationsRef = collection(this.firestore, 'locations');

    const locations$ = collectionData(locationsRef, { idField: 'id' });

    return locations$ as Observable<Location[]>;
  }

  getProvincesByCommunity(community: string): Observable<Location[]> {
    const locationsRef = collection(this.firestore, 'locations');

    const locationsQuery = query(locationsRef, where('community', '==', community));

    const locations$ = collectionData(locationsQuery, { idField: 'id' });

    return locations$ as Observable<Location[]>;
  }

  /**
   * Retrieves rentals (houses and floors) based on the specified community
   *
   * @param community, The community name to filter rentals by
   * @returns An Observable emitting an array of rentals (houses or floors)
   */
  getRentalsByCommunity(community: string): Observable<(House | Floor)[]> {
    const housesRef = collection(this.firestore, 'houses');
    const floorsRef = collection(this.firestore, 'floors');

    const housesQuery = query(housesRef, where('autCommunity', '==', community));
    const floorsQuery = query(floorsRef, where('autCommunity', '==', community));

    const houses$ = collectionData(housesQuery, { idField: 'id' });
    const floors$ = collectionData(floorsQuery, { idField: 'id' });

    return combineLatest([houses$, floors$]).pipe(
      map(([houses, floors]) => [...houses, ...floors])
    ) as Observable<(House | Floor)[]>;
  }

  /**
   * Adds a new house to the Firestore 'houses' collection
   *
   * @param autCommunity, The autonomous community of the house
   * @param municipality, The municipality of the house
   * @param street, The street address of the house
   * @param title, The title or name of the house
   * @param desc, The description of the house
   * @param numRooms, The number of rooms in the house
   * @param numBathrooms, The number of bathrooms in the house
   * @param numFloors, The number of floors in the house
   * @param numTerraces, The number of terraces in the house
   * @param squareMeter, The total area of the house in square meters
   * @param garage, A boolean indicating if the house has a garage
   * @param price, The price of the house
   * @param outside, A boolean indicating if the house is outside
   * @param owner, The owner of the house
   * @returns A Promise that resolves with the document reference of the newly added house
   */
  async addHouse(autCommunity: string, province:string, municipality: string, street: string, title: string, desc: string, numRooms: number, numBathrooms: number, numFloors: number, numTerraces: number, squareMeter: number, garage: boolean, price: number, outside: boolean, owner: string) {
    let houseToAd: House;
    houseToAd = new House('', autCommunity, province, municipality, street, title, desc, numRooms, numBathrooms, numFloors, numTerraces, squareMeter, garage, price, outside, owner, 'house');
    const placeRef = collection(this.firestore, 'houses');
    const data = this.toObject(houseToAd);

    const docRef = await addDoc(placeRef, data);
    const id = docRef.id;
    const houseWithId: House = { ...houseToAd, idProperty: id };
    const docToUpdate = doc(placeRef, id);
    const updatedData = this.toObject(houseWithId);
    await setDoc(docToUpdate, updatedData);
    return id;
  }

  /**
   * Adds a new floor to the Firestore 'floors' collection
   *
   * @param autCommunity, The autonomous community of the floor
   * @param municipality, The municipality of the floor
   * @param street, The street address of the floor
   * @param title, The title or name of the floor
   * @param desc, The description of the floor
   * @param numRooms, The number of rooms in the floor
   * @param numBathrooms, The number of bathrooms in the floor
   * @param numFloors, The number of floors in the building
   * @param numTerraces, The number of terraces in the floor
   * @param squareMeter, The total area of the floor in square meters
   * @param garage, A boolean indicating if the floor has a garage
   * @param price, The price of the floor
   * @param floor, The floor number of the floor
   * @param owner, The owner of the floor
   * @returns A Promise that resolves with the ID of the newly added floor
   */
  async addFloor(autCommunity: string, province: string, municipality: string, street: string, title: string, desc: string, numRooms: number, numBathrooms: number, numFloors: number, numTerraces: number, squareMeter: number, garage: boolean, price: number, floor: number, owner: string) {
    let floorToAd: Floor;
    floorToAd = new Floor('', autCommunity, province, municipality, street, title, desc, numRooms, numBathrooms, numFloors, numTerraces, squareMeter, garage, price, floor, owner, 'floor');

    const placeRef = collection(this.firestore, 'floors');
    const data = this.toObject(floorToAd);

    const docRef = await addDoc(placeRef, data);
    const id = docRef.id;
    const floorWithId: Floor = { ...floorToAd, idProperty: id };
    const docToUpdate = doc(placeRef, id);
    const updatedData = this.toObject(floorWithId);
    await setDoc(docToUpdate, updatedData);
    return id;
  }

  /**
   * Retrieves a property (house or floor) from Firestore based on its ID
   *
   * @param id, The ID of the property to retrieve
   * @returns An Observable that emits the retrieved property (house or floor)
   */
  getPropertyById(id: string): Observable<House | Floor> {
    const houseRef = doc(this.firestore, 'houses', id);
    const floorRef = doc(this.firestore, 'floors', id);

    const house$ = docData(houseRef).pipe(
      map(property => property as House)
    );

    const floor$ = docData(floorRef).pipe(
      map(property => property as Floor)
    );

    return combineLatest([house$, floor$]).pipe(
      map(([house, floor]) => house || floor)
    );
  }

  /**
   * Update the data of the property with the same id on the bbdd
   * 
   * @param id, the id of the property that will be changed
   * @param updatedData, the House or Floor with the new data
   * @returns A promise thet resolves when the property is successfully updated
   */
  updateProperty(id: string, updatedData: House | Floor) {
    let objectRef;

    if (updatedData instanceof House)
      objectRef = doc(this.firestore, 'houses', id);
    else
      objectRef = doc(this.firestore, 'floors', id);

    const data = this.toObject(updatedData);

    return updateDoc(objectRef, data);
  }

  /**
   * Deletes a property (house or floor) with the provided ID
   *
   * @param id, The ID of the property to delete
   * @returns A Promise that resolves when the property is successfully deleted
   */
  async deleteProperty(id: string) {
    const housesRef = doc(this.firestore, 'houses', id);
    const floorsRef = doc(this.firestore, 'floors', id);
    
    const houseDoc = await getDoc(housesRef);

    if (houseDoc.exists()) {
      return deleteDoc(housesRef);
    } else {
      return deleteDoc(floorsRef);
    }
  }

  /**
   * Converts an object to a flat object by copying its properties
   *
   * @param object, The object to be converted
   * @returns A flat object with copied properties from the original object
   */
  private toObject(object: any): any {
    const properties = Object.getOwnPropertyNames(object);
    const flatObject: any = {};

    properties.forEach(property => {
      flatObject[property] = object[property];
    });

    return flatObject;
  }
}
