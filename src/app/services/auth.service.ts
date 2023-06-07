import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  /**
   * Register a new user with email and password
   * @param name, the name of the user
   * @param email, the email of the user
   * @param password, the password of the user
   * @returns A promise that resolves to the logged in user's credentials or null on error
   */
  async register(name:string, email:string, password:string){
    try {
      const credential = await this.afauth.createUserWithEmailAndPassword(email, password);
      const user = credential.user;

      if (user) {
        await user.updateProfile({
          displayName: name
        });
      }

      return credential;
    } catch(error) {
      console.log("Error en login: " + error);
      return null;
    }
  }

  /**
   * Logs in a user with email and password.
   * @param email, The user's email.
   * @param password, The user's password.
   * @returns A promise that resolves with the user's credentials upon successful login, or null in case of error.
   */
  async login(email:string, password:string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch(error) {
      console.log("Error en login: " + error);
      return null;
    }
  }

  /**
   * Logs in a user with Google authentication.
   * @returns A promise that resolves with the user's credentials upon successful login, or null in case of error.
   */
  async loginWithGoogle(){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch(error) {
      console.log("Error en login con google: " + error);
      return null;
    }
  }

  /**
   * Returns an observable that represents the authentication state of the user.
   * @returns An observable that emits the current user authentication state.
   */
  getUserLogged() {
    return this.afauth.authState;
  }

  /**
   * Signs out the currently authenticated user.
   */
  logout() {
    this.afauth.signOut();
  }
}
