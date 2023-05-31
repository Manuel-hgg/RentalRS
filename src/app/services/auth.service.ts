import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

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

  async login(email:string, password:string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch(error) {
      console.log("Error en login: " + error);
      return null;
    }
  }

  async loginWithGoogle(){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch(error) {
      console.log("Error en login con google: " + error);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logout() {
    this.afauth.signOut();
  }
}
