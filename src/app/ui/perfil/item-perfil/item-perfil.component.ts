import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-perfil',
  templateUrl: './item-perfil.component.html',
  styleUrls: ['./item-perfil.component.css']
})
export class ItemPerfilComponent {
  @Input() usuario: any;

  constructor(private authService: AuthService,
    private router: Router) { }

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
    this.router.navigate(['/propiedad/agregar']);
  }
}
