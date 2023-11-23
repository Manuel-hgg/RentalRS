import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Usuario } from '../model/usuario';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth,
    private firestore: Firestore) { }

  /**
   * Registra un nuevo usuario con su email y contraseña
   * @param nombre, el nombre del usuario
   * @param email, el email del usuario
   * @param contrasenia, la cotrasenia del usuario
   * @returns Promise con las credenciales del usuario, o null en caso de que no se haya podido registrar
   */
  async registrarse(nombre:string, email:string, contrasenia:string){
    try {
      const credenciales = await this.afauth.createUserWithEmailAndPassword(email, contrasenia);
      const usuario = credenciales.user;

      if (usuario) {
        await usuario.updateProfile({
          displayName: nombre
        });
      }

      return credenciales;
    } catch(error) {
      console.log("Error en login: " + error);
      return null;
    }
  }

  /**
   * Inicia sesion con el correo y contraseña de un usuario
   * @param email, el email del usuario
   * @param contrasenia, la contraseña del usuario 
   * @returns Promise con el usuario, o null en caso de que no se haya podido iniciar sesion
   */
  async iniciarSesion(email:string, contrasenia:string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, contrasenia);
    } catch(error) {
      console.log("Error en login: " + error);
      return null;
    }
  }

  /**
   * Inicia sesion con la cuenta de Google del usuario
   * @returns Promise con el usuario, o null en caso de que no se haya podido iniciar sesion
   */
  async iniciarSesionGoogle(){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch(error) {
      console.log("Error en login con google: " + error);
      return null;
    }
  }

  /**
   * Devuelve el usuario que se encuentra logeado
   * @returns Observable con el usuario logeado
   */
  getUsuarioLogeado() {
    return this.afauth.authState;
  }

  /**
   * Devuelve un usuario por su id
   * 
   * @param idUsuario id del usuario a buscar
   * @returns Promise con el usuario
   */
  getUsuarioPorId(idUsuario: string) {
    const refUsuario = doc(this.firestore, 'usuarios', idUsuario);

    const usuario$ = docData(refUsuario).pipe(
      map(usuario => usuario as Usuario)
    )

    return usuario$;
  }

  /**
   * Comprueba si el usuario al que se va a añadir el comentario ya existe y en caso de que no exista lo crea y agrega el comentario que ha echo en un inmueble
   * 
   * @param idUsuario id del usuario que escribe el comentario
   * @param idPropiedad id de la propiedad en la que escribe el comentario
   * @param comentario comentario escrito por el usuario
   * @returns Promesa con el nuevo comentario 
   */
  async agregarComentario(idUsuario: string, idPropiedad: string, comentario: string) {
    const refUsuario = doc(this.firestore, 'usuarios', idUsuario);

    const usuario = await getDoc(refUsuario);

    if(usuario.exists()) {
      const usuarioData = usuario.data() as Usuario;

      usuarioData.comentarios[idPropiedad] = comentario;

      const updateData: { [key: string]: any } = usuarioData;

      return updateDoc(refUsuario, updateData);
    } else {
      const nuevoUsuario = {
        idUsuario: idUsuario,
        comentarios: {
          [idPropiedad]: comentario
        },
        solicitudes: []
      };

      return setDoc(refUsuario, nuevoUsuario);
    }
  }

  /**
   * Cierra la sesion del usuario que estuviera conectado
   */
  cerrarSesion() {
    this.afauth.signOut();
  }
}
