import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-alquileres-perfil',
  templateUrl: './alquileres-perfil.component.html',
  styleUrls: ['./alquileres-perfil.component.css']
})
export class AlquileresPerfilComponent {
  @Input() usuarioLogeado!: firebase.User;

  usuario!: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.getUsuarioPorId(this.usuarioLogeado.uid).subscribe(usuario => {
        this.usuario = usuario;
      });
    }, 1000);
  }

  
}
