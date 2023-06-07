import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RentalsComponent } from './ui/rentals/rentals.component';
import { AboutComponent } from './info/about/about.component';
import { ContactComponent } from './info/contact/contact.component';
import { AddPropertyComponent } from './funciones/add-property/add-property.component';
import { LoginComponent } from './funciones/login/login.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { ViewPropertyComponent } from './funciones/view-property/view-property.component';
import { RegisterComponent } from './funciones/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rentals/:community', component: RentalsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'property/add', component: AddPropertyComponent },
  { path: 'property/edit/:id', component: AddPropertyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'view/:id', component: ViewPropertyComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
