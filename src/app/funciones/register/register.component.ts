import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  /**
   * Register the user with the name, email and password of the form
   */
  register(): void {
    const {name, email, password} = this.user;

    if (this.checkData(name, email, password)){
      this.authService.registrarse(name, email, password)

      this.router.navigate(['/login']);
    }
  }

  /**
   * Register the user with the google account
   * Then navigate to profile
   */
  registerWithGoogle() {
    this.authService.iniciarSesionGoogle();

    this.router.navigate(['profile']);
  }

  /**
   * Checks if the user entered all the data in the form
   * If the user entered all the data it returns true
   * If the user did not enter all the data, it returns false
   * 
   * @param name, the name of the user
   * @param email, the email of the user
   * @param password, the password of the user
   * @returns True if it get all data, false if it not get all the data
   */
  private checkData(name: string, email: string, password: string): boolean {
    if (name !== '' && email !== '' && password !== '')
      return true;
    
    alert('Debes introducir todos los datos');
    return false;
  }
}
