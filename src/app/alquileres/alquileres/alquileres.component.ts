import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/model/inmueble';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent {

  listaAlquileres!: Inmueble[];
  communitySelected!: string;

  constructor(private alquileresService: AlquileresService,
              private router: ActivatedRoute,
              private route: Router) {
    
  }

  ngOnInit(): void {
    this.communitySelected = this.router.snapshot.params['community'];
  }

  ngAfterViewInit(): void {
    this.cargarListaAlquileres();
  }

  showProperty(id: number) {
    this.route.navigate(['view', id]);
  }

  private cargarListaAlquileres(): void {
    this.listaAlquileres = this.alquileresService.getByCommunity(this.communitySelected);
  }
}
