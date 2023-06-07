import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Floor } from 'src/app/model/floor';
import { House } from 'src/app/model/house';
import { Location } from 'src/app/model/location';
import { RentalsService } from 'src/app/services/rentals.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  tipoSeleccionado: string = 'house';

  autCommunity!: string;
  province!: string;
  municipality!: string;
  street!: string;
  title!: string;
  description!: string;
  numRooms!: number;
  numBathrooms!: number;
  numFloors!: number;
  numTerraces!: number;
  squareMeter!: number;
  garage: boolean = false;
  price!: number;
  outside: boolean = false;
  floor!: number;
  owner!: string;
  scores!: number[];

  allComunities!: Location[];
  allProvinces!: string[];
  userLogged;

  userLoggedId!: string;
  id!: string | null;

  constructor(private rentalsService: RentalsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {
    this.rentalsService.getAllCommunities().subscribe(locations => {
      this.allComunities = locations;
    })
    this.userLogged = this.authService.getUserLogged();
  }

  ngOnInit() {
    this.getIdUser();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || null;
    });

    if (this.id !== null)
      this.loadProperty();
  }

  /**
   * Adds a new property (house or floor) based on the selected property type and the provided property details
   * If the logged-in user ID is available, it calls the corresponding method in the `rentalsService` to add the property
   * After adding the property, it displays a success message and navigates to the 'profile' route
   */
  addProperty(): void {
    if (this.userLoggedId) {
      if (this.tipoSeleccionado === 'house')
        this.rentalsService.addHouse(this.autCommunity, this.province, this.municipality, this.street, this.title, this.description, this.numRooms, this.numBathrooms, this.numFloors, this.numTerraces, this.squareMeter, this.garage, this.price, this.outside, this.userLoggedId);
      else
        this.rentalsService.addFloor(this.autCommunity, this.province, this.municipality, this.street, this.title, this.description, this.numRooms, this.numBathrooms, this.numFloors, this.numTerraces, this.squareMeter, this.garage, this.price, this.floor, this.userLoggedId);

      alert(this.tipoSeleccionado + ' agregado con exito');
      this.router.navigate(['profile'])
    }
  }

  /**
   * Updates the property based on the provided property details
   * If an ID is available and a property type is selected, it creates a new instance of the House or Floor class with the updated data
   * It then calls the `updateProperty` method in the `rentalsService` to update the property
   * After updating the property, it displays a success message, and navigates to the 'view' route with the ID as a parameter
   */
  updateProperty(): void {
    var data;
    if (this.id !== null) {
      if (this.tipoSeleccionado === 'house')
        data = new House(this.id, this.autCommunity, this.province, this.municipality, this.street, this.title, this.description, this.numRooms, this.numBathrooms, this.numFloors, this.numTerraces, this.squareMeter, this.garage, this.price, this.outside, this.owner, this.tipoSeleccionado);
      else
        data = new Floor(this.id, this.autCommunity, this.province, this.municipality, this.street, this.title, this.description, this.numRooms, this.numBathrooms, this.numFloors, this.numTerraces, this.squareMeter, this.garage, this.price, this.floor, this.owner, this.tipoSeleccionado);
      
      this.rentalsService.updateProperty(this.id, data);

      alert('La propiedad ha sido actualizada');

      this.router.navigate(['/view', this.id]);
    }
  }

  /**
   * Load the provinces of the community that the user selected
   */
  loadProvinces() {
    this.rentalsService.getProvincesByCommunity(this.autCommunity).subscribe(locations => {
      this.allProvinces = locations[0].provinces;
    });
  }

  /**
   * Navigate to previous component
   */
  cancel(): void {
    if(this.id !== null) 
      this.router.navigate(['/view', this.id]);
    else
      this.router.navigate(['/profile']);
  }

  /**
   * Retrieves the ID of the logged-in user and assigns it to the `userLoggedId` property
   * It subscribes to the `userLogged` Observable and updates the `userLoggedId` property when the user is available
   */
  getIdUser(): void {
    this.userLogged.subscribe(user => {
      if (user)
        this.userLoggedId = user.uid;
    });
  }

  /**
   * Loads the details of the property with the provided ID
   * If the ID is not null, it calls the `getPropertyById` method of the `rentalsService` to retrieve the property details
   * After retrieving the property details, it assigns the values to the corresponding component properties
   * If the logged-in user is not the owner of the property, it navigates to the '/home' route
   */
  private loadProperty(): void {
    if (this.id !== null) {
      this.rentalsService.getPropertyById(this.id).subscribe(property => {
        this.autCommunity = property.autCommunity;
        this.province = property.province;
        this.municipality = property.municipality;
        this.street = property.street;
        this.title = property.title;
        this.description = property.description;
        this.numRooms = property.numRooms;
        this.numBathrooms = property.numBathrooms;
        this.numFloors = property.numFloors;
        this.numTerraces = property.numTerraces
        this.squareMeter = property.squareMeter;
        this.garage = property.garage;
        this.price = property.price;
        this.owner = property.owner;
        this.scores = property.scores;
        this.tipoSeleccionado = property.type;

        this.loadProvinces();

        if (this.owner !== this.userLoggedId) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}