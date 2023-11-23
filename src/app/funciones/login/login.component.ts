import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = {
    email: '',
    contrasenia: ''
  }

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  /**
   * Inicia sesion con los datos introducidos por el usuario
   * Luego lo redirige a su perfil
   */
  iniciarSesion() {
    const {email, contrasenia} = this.usuario;
    this.authService.iniciarSesion(email, contrasenia);

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 2000);
  }

  /**
   * Inicia sesión con Google
   * Luego lo redirige a su perfil
   */
  iniciarConGoogle() {
    this.authService.iniciarSesionGoogle();

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 2000);
  }
}
