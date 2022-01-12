import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {ChartModule} from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { CommonModule } from '@angular/common';
import { PonudeComponent } from './Ponude/ponude/ponude.component';
import { DetaljiFilmaComponent } from './detalji-filma/detalji-filma.component';
import { GlumciComponent } from './glumci/glumci.component';
import { StavkeComponent } from './stavke/stavke.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { DatepipeComponent } from './datepipe/datepipe.component';
import {DatePipe} from "@angular/common";
import { MoviesPanelComponent } from './client-movies/movies-panel/movies-panel.component';
import { ManagementNavigationComponent } from './GeneralComponents/management-navigation/management-navigation.component';
import { ClientNavComponent } from './GeneralComponents/client-nav/client-nav.component';
import { ClientHomeComponent } from './GeneralComponents/home/client/client-home/client-home.component';
import { HomeComponent } from './GeneralComponents/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    FilmoviComponent,
    ProjekcijeComponent,
    PonudeComponent,
    DetaljiFilmaComponent,
    GlumciComponent,
    StavkeComponent,
    ProizvodComponent,
    DatepipeComponent,
    MoviesPanelComponent,
    ManagementNavigationComponent,
    ClientNavComponent,
    ClientHomeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ChartModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
