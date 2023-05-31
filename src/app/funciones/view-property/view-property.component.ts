import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent {

  property!: Inmueble | undefined;

  constructor(private router: ActivatedRoute,
              private alquileresService: AlquileresService) {
    
  }

  ngOnInit() {
    let id = this.router.snapshot.params['id'];
    this.property = this.alquileresService.getPropertyById(id);
  }
}
