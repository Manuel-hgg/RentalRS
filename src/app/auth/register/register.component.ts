import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usuario = {
    nombre: '',
    email: '',
    contrasenia: ''
  }

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  /**
   * Registra al usuario con el nombre, email y contraseña introducidos
   * Luego lo redirige a su perfil
   */
  registrarse(): void {
    const {nombre, email, contrasenia} = this.usuario;

    if (this.comprobarDatos(nombre, email, contrasenia)){
      this.authService.registrarse(nombre, email, contrasenia)

      setTimeout(() => {
        this.router.navigate(['/perfil']);
      }, 2000);  
    }
  }

  /**
   * Registra al usuario con google
   * Luego lo redirige a su perfil
   */
  registrarseConGoogle() {
    this.authService.iniciarSesionGoogle();

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 2000);  
  }

  /**
   * Comprueba si el usuario introdujo todos los datos necesarios en el formulario
   * Si el usuario introdujo todos los datos retorna true
   * Si el usuario no introdujo todos los datos retorna false
   * 
   * @param nombre, el nombre del usuario
   * @param email, el email del usuario
   * @param contrasenia, la constraseña del usuario
   * @returns True si tiene todos los datos, false si no tiene todos los datos
   */
  private comprobarDatos(nombre: string, email: string, contrasenia: string): boolean {
    if (nombre !== '' && email !== '' && contrasenia !== '')
      return true;
    
    alert('Debes introducir todos los datos');
    return false;
  }
}
