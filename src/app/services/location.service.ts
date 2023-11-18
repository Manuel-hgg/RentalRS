import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private firestore: Firestore) { }

  /**
 * Devuelve todas las localizaciones
 * 
 * @returns Observable, con todas las localizaciones
 */
  getComunidades(): Observable<Location[]> {
    const refLocalizaciones = collection(this.firestore, 'locations');

    const localizaciones$ = collectionData(refLocalizaciones, { idField: 'id' });

    return localizaciones$ as Observable<Location[]>;
  }

  /**
   * Devuelve todas las provincias de una comunidad
   * 
   * @param comunidad, comunidad para buscar
   * @returns Observable<Location[]>, con todas las provincias
   */
  getProvinciasPorComunidad(comunidad: string): Observable<string[]> {
    const refLocalizaciones = collection(this.firestore, 'locations');

    const queryLocalizaciones = query(refLocalizaciones, where('community', '==', comunidad));

    const localizaciones$ = collectionData(queryLocalizaciones, { idField: 'id' });

    return localizaciones$.pipe(
      map(locations => locations.map(location => location['provinces']).flat())
    );
  }
}
