import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userLogged = this.authService.getUserLogged();

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  /** 
   * Comprueba si el usuario esta logeado, en caso de que no lo este lo redirige a la pagina de Login
   */
  ngOnInit() {
    setTimeout(() => {
      this.userLogged.subscribe(user => {
        if (!user) {
          this.router.navigate(['/login']);
        }
      });
    }, 5000);    
  }

  /**
   * Cierra la sesión del usuario
   */
  cerrarSesion(): void {
    this.authService.cerrarSesion();

    this.router.navigate(['/login']);
  }

  /**
   * Navega al componente para añadir una nueva propiedad 
   */
  aniadirPropiedad(): void {
    this.router.navigate(['/property/add']);
  }
}
