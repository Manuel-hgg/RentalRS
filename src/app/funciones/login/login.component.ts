import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  /**
   * Create a const with the data of user and log the user with the data received
   * Then navigate to the profile
   */
  login() {
    const {email, password} = this.user;
    this.authService.login(email, password);

    this.router.navigate(['/profile']);
  }

  /**
   * Login the user with the google account
   * Then navigate to the profile
   */
  loginWithGoogle() {
    this.authService.loginWithGoogle();

    this.router.navigate(['/profile']);
  }

  /**
   * Logout the user 
   */
  logout() {
    this.authService.logout();
  }
}
