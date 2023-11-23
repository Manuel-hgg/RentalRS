import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  usuarioLogeado = this.authService.getUsuarioLogeado();

  constructor(private authService: AuthService) {
    
  }
}
