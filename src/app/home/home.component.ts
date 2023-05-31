import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlquileresService } from '../services/alquileres.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allCommunities: string[];
  communitySelected!: string;

  constructor(private rentalsSerices: AlquileresService,
              private router: Router) {
    this.allCommunities = this.rentalsSerices.getAllCommunities();
    this.communitySelected = '';
  }

  searchRentals(): void {
    if (this.communitySelected !== '')
      this.router.navigate(['rentals', this.communitySelected]);
    else
      alert('Elige un destino');
  }
}
