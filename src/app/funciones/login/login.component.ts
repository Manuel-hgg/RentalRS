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
    password: ''
  }

  /**
   *
   */
  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  login() {
    const {email, password} = this.usuario;
    this.authService.login(email, password);

    this.router.navigate(['profile']);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();

    this.router.navigate(['profile']);
  }

  getUserLogged() {
    this.authService.getUserLogged().subscribe(res => {
      console.log(res?.email);
    });
  }

  logout() {
    this.authService.logout();
  }
}
