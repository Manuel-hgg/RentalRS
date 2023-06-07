import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RentalsService } from '../services/rentals.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allCommunities!: Location[];
  communitySelected!: string;

  constructor(private rentalsSerices: RentalsService,
              private router: Router) {
    this.rentalsSerices.getAllCommunities().subscribe(locations => {
      this.allCommunities = locations;
    })
    
    this.communitySelected = 'All';
  }

  /**
   * Performs a search for rentals based on the selected community.
   * If a community is selected, it navigates to the 'rentals' route with the selected community as a parameter.
   * If no community is selected, it displays an alert message asking the user to choose a destination.
   */
  searchRentals(): void {
    if (this.communitySelected !== '')
      this.router.navigate(['/rentals', this.communitySelected]);
    else
      alert('Elige un destino');
  }
}
