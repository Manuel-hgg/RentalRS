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

  /** checks if the user is logged in, if not it redirects him to the login
   * 
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
   * Calls the logout() of the AuthService to logout the actual user
   * Then navigate to login component
   */
  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  /**
   * Navigate to add view 
   */
  addProperty(): void {
    this.router.navigate(['/property/add']);
  }
}
