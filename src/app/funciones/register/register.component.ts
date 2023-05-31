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

  register(): void {
    const {name, email, password} = this.user;

    if (this.checkData(name, email, password)){
      this.authService.register(name, email, password)

      this.router.navigate(['/login']);
    }
  }

  checkData(name: string, email: string, password: string): boolean {
    if (name !== '' && email !== '' && password !== '')
      return true;
    
    alert('Debes introducir todos los datos');
    return false;
  }
}
