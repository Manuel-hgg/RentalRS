import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Floor } from 'src/app/model/floor';
import { House } from 'src/app/model/house';
import { RentalsService } from 'src/app/services/rentals.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent {

  userLogged;
  property!: House | Floor;
  private id: string;
  scoreProperty!: number;

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private rentalsService: RentalsService,
              private authService: AuthService) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.userLogged = this.authService.getUserLogged();
  }

  /**
   * Load the property with the same id of the parameter of URL
   * Then calls private loadScore() to calculate the score of this property
   */
  ngOnInit() {
    this.rentalsService.getPropertyById(this.id).subscribe(property => {
      this.property = property;

      this.loadScore();
    });
  }

  /**
   * Deletes the selected property.
   * If a property is selected, it calls the `deleteProperty` method of the `rentalsService` to delete the property.
   * After deleting the property, it navigates to the '/rentals/All' route.
   */
  deleteProperty() {
    if (this.property) {
      this.rentalsService.deleteProperty(this.id);

      this.router.navigate(['/rentals', 'All']);
    }
  }

  /**
   * Navigate to the edit view of this property
   */
  updateProperty() {
    if (this.property)
      this.router.navigate(['/property', 'edit', this.property.idProperty]);
  }

  /**
   * Calculates the average of the scores given by the rest of the users
   */
  private loadScore() {
    if (this.property.scores.length == 0) {
      this.scoreProperty = 0;
    } else {
      for (let sc of this.property.scores) {
        this.scoreProperty += sc;
      }

      this.scoreProperty = this.scoreProperty / this.property.scores.length;

      console.log(this.scoreProperty)
    }
  }
}
