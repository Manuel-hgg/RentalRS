import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

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
  getUserLogged() {
    return this.afauth.authState;
  }

  /**
   * Cierra la sesion del usuario que estuviera conectado
   */
  cerrarSesion() {
    this.afauth.signOut();
  }
}
