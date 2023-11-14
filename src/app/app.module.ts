import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { NavbarFooterComponent } from './ui/navbar-footer/navbar-footer.component';
import { AboutComponent } from './info/about/about.component';
import { ContactComponent } from './info/contact/contact.component';
import { AddPropertyComponent } from './funciones/add-property/add-property.component';
import { LoginComponent } from './funciones/login/login.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { ViewPropertyComponent } from './funciones/view-property/view-property.component';
import { RegisterComponent } from './funciones/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AlquileresComponent } from './ui/alquileres/alquileres/alquileres.component';
import { ItemAlquileresComponent } from './ui/alquileres/item-alquileres/item-alquileres.component';
import { FiltrosComponent } from './ui/alquileres/filtros/filtros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NavbarFooterComponent,
    AboutComponent,
    ContactComponent,
    AddPropertyComponent,
    LoginComponent,
    ProfileComponent,
    ItemAlquileresComponent,
    ViewPropertyComponent,
    RegisterComponent,
    AlquileresComponent,
    FiltrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
