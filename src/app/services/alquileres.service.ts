import { Firestore, collection, addDoc, collectionData, query, where, doc, docData, setDoc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Inmueble } from '../model/inmueble';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {

  constructor(private firestore: Firestore,
    private storage: Storage) { }

  /**
   * Devuelve todos los inmuebles
   * 
   * @returns Observable, con todos los inmuebles
   */
  getInmuebles(): Observable<Inmueble[]> {
    const refInmuebles = collection(this.firestore, 'inmuebles');

    const inmuebles$ = collectionData(refInmuebles, { idField: 'id' });

    return inmuebles$ as Observable<Inmueble[]>;
  }

  /**
   * Devuelve todos los inmuebles filtrados por su comunidad autónoma
   *
   * @param comunidad, La comunidad por la que se va a filtrar
   * @returns Observable, con todos los inmuebles que pertenecen a la comunidad
   */
  getAlquileresPorComunidad(comunidad: string): Observable<Inmueble[]> {
    const refInmuebles = collection(this.firestore, 'inmuebles');

    const queryInmuebles = query(refInmuebles, where('comunidadAutonoma', '==', comunidad));

    const inmuebles$ = collectionData(queryInmuebles, { idField: 'id' });

    return inmuebles$ as Observable<Inmueble[]>;
  }

  /**
   * Añade un nuevo inmueble a la BBDD
   *
   * @param comunidadAutonoma, La comunidad autonoma del inmueble
   * @param municipio, el municipio del inmueble
   * @param calle, la calle del inmueble
   * @param titulo, el titulo del inmueble
   * @param desc, la descripcion del inmueble
   * @param numHabitaciones, el número de habitaciones que tiene el inmueble
   * @param numBanios, el número de baños que tiene el inmueble
   * @param numPisos, el número de pisos que tiene el inmueble
   * @param numTerrazas, el número de terrazas que tiene el inmueble
   * @param metrosCuadrados, el total de metros cuadrados del inmueble
   * @param garaje, boolean que indica si el inmueble dispone de garaje 
   * @param precio, el precio del inmueble por noche
   * @param exterior, boolean que indica si el inmueble dispone de exterior
   * @param propietario, el propietario del inmueble
   * @returns el id del inmueble agregado
   */
  async aniadirInmueble(comunidadAutonoma: string, provincia: string, municipio: string, calle: string, titulo: string, foto: string, desc: string, numHabitaciones: number, numBanios: number, numPisos: number, numTerrazas: number, metrosCuadrados: number, garaje: boolean, precio: number, propietario: string, correoPropietario: string, tipo: string) {
    let inmueble: Inmueble;
    inmueble = new Inmueble('', comunidadAutonoma, provincia, municipio, calle, titulo, foto, desc, numHabitaciones, numBanios, numPisos, numTerrazas, metrosCuadrados, garaje, precio, propietario, correoPropietario, tipo);
    const placeRef = collection(this.firestore, 'inmuebles');
    const data = this.toObject(inmueble);

    const docRef = await addDoc(placeRef, data);
    const id = docRef.id;
    const inmuebleId: Inmueble = { ...inmueble, idPropiedad: id };
    const docParaActualizar = doc(placeRef, id);
    const nuevosDatos = this.toObject(inmuebleId);
    await setDoc(docParaActualizar, nuevosDatos);
    return id;
  }

  /**
   * Devuelve los datos de un inmueble por su ID
   *
   * @param id, El ID del inmueble a buscar
   * @returns Observable que contiene el inmueble
   */
  getInmueblePorId(id: string): Observable<Inmueble> {
    const refInmueble = doc(this.firestore, 'inmuebles', id);

    const inmueble$ = docData(refInmueble).pipe(
      map(propiedad => propiedad as Inmueble)
    )

    return inmueble$;
  }

  /**
   * Devuelve todos los inmuebles de un mismo propietario
   * 
   * @param idPropietario Id del propietario a buscar
   * @returns Observable con todos los inmuebles del propietario
   */
  getInmueblesPorPropietario(idPropietario: string): Observable<Inmueble[]> {
    const refInmuebles = collection(this.firestore, 'inmuebles');

    const queryIdPropietario = query(refInmuebles, where('propietario', '==', idPropietario));

    const inmuebles$ = collectionData(queryIdPropietario, { idField: 'id' }) as Observable<Inmueble[]>;

    return inmuebles$;
  }

  /**
   * Actualiza los datos de un inmueble
   * 
   * @param id, El id del inmueble que va a ser modificado
   * @param nuevosDatos, los nuevos datos del inmueble
   * @returns Promise con el inmueble actualizado
   */
  modificarPropiedad(id: string, nuevosDatos: Inmueble) {
    const refInmueble = doc(this.firestore, 'inmuebles', id);

    const data = this.toObject(nuevosDatos);

    return updateDoc(refInmueble, data);
  }

  /**
   * Agrega la puntuacion dada por un usuario al inmueble
   * 
   * @param idPropiedad la id de la propiedad a la que se va a añadir o actualizar la puntuacion
   * @param idUsuario el id del usuario que introdujo la nueva puntuacion
   * @param puntuacion la puntuacion introducida por el usuario
   * @returns Promesa con el inmueble actualizado
   */
  async aniadirPuntuacionPropiedad(idPropiedad: string, idUsuario: string, puntuacion: number) {
    const refInmueble = doc(this.firestore, 'inmuebles', idPropiedad);

    const inmuebleData = (await getDoc(refInmueble)).data() as Inmueble;

    inmuebleData.puntuaciones[idUsuario] = puntuacion;

    const datosNuevos: { [key: string]: any } = inmuebleData;

    return updateDoc(refInmueble, datosNuevos);
  }

  /**
   * Agrega un comentario echo por un usuario al inmueble
   * 
   * @param idPropiedad id de la propiedad a la que se agrega el comentario 
   * @param idUsuario id del usuario que escribe el comentario
   * @param nombreUsuario nombre del usuario que escribe el comentario
   * @param comentario comentario escrito por el usuario
   * @returns Promesa con el inmueble actualizado
   */
  async aniadirComentarioPropiedad(idPropiedad: string, idUsuario: string, nombreUsuario: string, comentario: string) {
    const refInmueble = doc(this.firestore, 'inmuebles', idPropiedad);

    const inmuebleData = (await getDoc(refInmueble)).data() as Inmueble;

    inmuebleData.comentarios[idUsuario] = [nombreUsuario, comentario];

    const datosNuevos: { [key: string]: any } = inmuebleData;

    return updateDoc(refInmueble, datosNuevos);
  }

  /**
   * Elimina un inmueble de la base de datos
   *
   * @param id, La id del inmueble para borrar
   * @returns Promise con el inmueble eliminado
   */
  async borrarPropiedad(id: string) {
    const refInmueble = doc(this.firestore, 'inmuebles', id);

    return deleteDoc(refInmueble);
  }

  /**
   * Sube una foto al storage de Firebase
   * 
   * @param event, la imagen a subir
   * @returns Promise<string> que contiene la url hacia la imagen
   */
  async subirImagen(event: any): Promise<string> {
    const file: File = event.target.files[0];

    const refImg = ref(this.storage, `images/${file.name}`);

    try {
      await uploadBytes(refImg, file);
      const url = await getDownloadURL(refImg);
      return url;
    } catch (error) {
      console.log('Error al subir la imagen:', error);
      throw error;
    }
  }

  /**
   * Almacena la solicitud de reserva de un inmueble en la bbdd del propietario para que pueda decidir si acepta o no la reserva
   * 
   * @param idPropietario id del propietario del inmueble
   * @param solicitudReserva Reserva con todos los datos de la solicitud 
   */
  async solicitarReserva(idPropietario: string, solicitudReserva: Reserva) {
    const refPropietario = doc(this.firestore, 'usuarios', idPropietario);

    const propietario = await getDoc(refPropietario);

    if (propietario.exists()) {
      const propietarioData = propietario.data() as Usuario;

      propietarioData.solicitudes.push(solicitudReserva);

      return updateDoc(refPropietario, { solicitudes: propietarioData.solicitudes });

    } else {
      const nuevoUsuario = {
        idUsuario: idPropietario,
        comentarios: {},
        solicitudes: [solicitudReserva]
      };

      setDoc(refPropietario, nuevoUsuario);
    }
  }

  /**
   * Acepta o rechaza una solicitud de reserva dependiendo de lo que haya seleccionado el propietario
   * 
   * @param aceptada boolean, true si se acepta la reserva, false si se rechaza la reserva
   * @param idPropietario string, id del propietario del inmueble al que se solicita la reserva
   * @param reserva Reserva, todos los datos de la reserva
   */
  async aceptarORechazarReserva(aceptada: boolean, idPropietario: string, reserva: Reserva) {
    const refPropietario = doc(this.firestore, 'usuarios', idPropietario);

    const propietario = await getDoc(refPropietario);


    if (propietario.exists()) {
      const solicitudes = [...propietario.data()['solicitudes']];
      const indexSolicitud = solicitudes.findIndex(solicitud => JSON.stringify(solicitud) === JSON.stringify(reserva));

      if (aceptada) {
        const refPropiedad = doc(this.firestore, 'inmuebles', reserva.idPropiedad);
        const refCliente = doc(this.firestore, 'usuarios', reserva.idCliente);

        const propiedad = await getDoc(refPropiedad);
        const cliente = await getDoc(refCliente);

        if (propiedad.exists() && cliente.exists()) {
          const reservas = [...propiedad.data()['reservas']];
          const alquileresRealizados = [...cliente.data()['alquileresRealizados']];

          reservas.push(reserva);
          alquileresRealizados.push(reserva);

          await updateDoc(refPropiedad, { reservas: reservas});
          await updateDoc(refCliente, { alquileresRealizados: alquileresRealizados });
        }
      }
      solicitudes.splice(indexSolicitud, 1);

      await updateDoc(refPropietario, { solicitudes: solicitudes });
    }
  }

  /**
   * Convierte un objeto de tipo Inmueble a un objeto plano
   *
   * @param object, El objeto a transformar
   * @returns Object, el objeto transformado
   */
  private toObject(object: any): any {
    const propiedades = Object.getOwnPropertyNames(object);
    const objetoPlano: any = {};

    propiedades.forEach(propiedad => {
      objetoPlano[propiedad] = object[propiedad];
    });

    return objetoPlano;
  }
}
