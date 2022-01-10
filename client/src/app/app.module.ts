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
import { ProfileComponent } from './User/Components/profile/profile.component';
import { UsersPanelComponent } from './User/Components/users-panel/users-panel.component';
import { WorkerComponent } from './User/Components/worker-panel/worker/worker.component';
import { CommonModule } from '@angular/common';
import { ManagementNavigationComponent } from './Components/management-navigation/management-navigation.component';
import { FilterPipe } from './User/Pipes/filter-pipe.pipe';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { RegisterComponent } from './Auth/Components/Register/register/register.component';
import { ConfirmMailComponent } from './Auth/Components/confirm-mail/confirm-mail.component';
import { UnathorizedComponent } from './Auth/Components/unathorized/unathorized.component';
import { PonudeComponent } from './Ponude/ponude/ponude.component';
import { DetaljiFilmaComponent } from './detalji-filma/detalji-filma.component';
import { GlumciComponent } from './glumci/glumci.component';
import { DashboardComponent } from './bi-dashboard/dashboard/dashboard.component';
import { MidComponent } from './bi-dashboard/mid/mid.component';
import { NavComponent } from './bi-dashboard/nav/nav.component';
import { ClientNavComponent } from './Components/klijent-nav/client-nav/client-nav.component';
import { MainNavComponent } from './Components/Main-Nav/main-nav/main-nav.component';
import { ClientHomeComponent } from './Components/home/client/client-home/client-home.component';
import { ClientMovieDetailsComponent } from './client-movie-details/client-movie-details/client-movie-details.component';
import { StavkeComponent } from './stavke/stavke.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { DatepipeComponent } from './datepipe/datepipe.component';
import {DatePipe} from "@angular/common";
import { MoviesPanelComponent } from './client-movies/movies-panel/movies-panel.component';
import { TableComponent } from './bi-dashboard/table/table.component';
import { BuyTicketsComponent } from './buy-tickets/buy-tickets.component';
import { BuySnacksModalComponent } from './buy-snacks-modal/buy-snacks-modal.component';
import { StavkaComponent } from './buy-snacks-modal/stavka/stavka.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmoviComponent,
    ProjekcijeComponent,
    ProfileComponent,
    UsersPanelComponent,
    WorkerComponent,
    ManagementNavigationComponent,
    FilterPipe,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmMailComponent,
    UnathorizedComponent,
    PonudeComponent,
    DetaljiFilmaComponent,
    GlumciComponent,
    DashboardComponent,
    MidComponent,
    NavComponent,
    ClientNavComponent,
    MainNavComponent,
    ClientHomeComponent,
    ClientMovieDetailsComponent,
    StavkeComponent,
    ProizvodComponent,
    DatepipeComponent,
    MoviesPanelComponent,
    TableComponent,
    BuyTicketsComponent,
    BuySnacksModalComponent,
    StavkaComponent,
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
