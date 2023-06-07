import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/model/inmueble';
import { RentalsService } from 'src/app/services/rentals.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent {

  private rentalsSubscription!: Subscription;

  rentalsList!: Inmueble[];
  communitySelected!: string;

  constructor(private rentalsService: RentalsService,
              private router: ActivatedRoute,
              private route: Router) {
    
  }

  /**
   * Retrieves the parameter passed by URL
   */
  ngOnInit(): void {
    this.communitySelected = this.router.snapshot.params['community'];
  }

  /**
   * Calls the private method loadRentalList()
   */
  ngAfterViewInit(): void {
    this.loadRentalList();
  }

  /**
   * Navigate to the property with the same id
   * 
   * @param id, the id of the property
   */
  showProperty(id: string) {
    this.route.navigate(['/view', id]);
  }

  /**
   * Navigate to previous component
   */
  goBack(): void {
    this.route.navigate(['/home']);
  }

  /** 
   * Load all the rentals
   * If the community selected is 'All', load all rentals of the bbdd
   * If the community selected is not 'All', load all rentals with the same community of the bbdd
   */
  private loadRentalList(): void {
    if(this.communitySelected === 'All') {
      this.rentalsSubscription = this.rentalsService.getAll().subscribe(properties => {
        this.rentalsList = properties;
      });
    } else {
      this.rentalsSubscription = this.rentalsService.getRentalsByCommunity(this.communitySelected).subscribe(properties => {
        this.rentalsList = properties;
      });
    }
  }

  /**
   * Cancel all subscriptions
   */
  ngOnDestroy() {
    if (this.rentalsSubscription)
      this.rentalsSubscription.unsubscribe();
  }
}
